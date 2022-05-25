import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';

import { useEventBus } from '@src/contexts/eventBus';
import type { getRenderedEventUIModels } from '@src/helpers/grid';
import { getGridDateIndex } from '@src/helpers/grid';
import { useWhen } from '@src/hooks/common/useWhen';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/useCurrentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/useDraggingEvent';
import type EventUIModel from '@src/model/eventUIModel';
import type TZDate from '@src/time/date';
import { findLastIndex } from '@src/utils/array';
import { isNil, isPresent } from '@src/utils/type';

import type { GridPositionFinder } from '@t/grid';

function getRowPosOfUIModel(uiModel: EventUIModel, dateRow: TZDate[]) {
  const startColumnIndex = Math.max(getGridDateIndex(uiModel.getStarts(), dateRow), 0);
  const endColumnIndex = getGridDateIndex(uiModel.getEnds(), dateRow);

  return {
    startColumnIndex,
    endColumnIndex,
  };
}

interface EventResizeHookParams {
  dateMatrix: TZDate[][];
  renderedUIModels: ReturnType<typeof getRenderedEventUIModels>[];
  cellWidthMap: string[][];
  gridPositionFinder: GridPositionFinder;
  rowIndex: number;
}

type FilteredUIModelRow = [] | [EventUIModel];

export function useDayGridMonthEventResize({
  dateMatrix,
  gridPositionFinder,
  renderedUIModels,
  cellWidthMap,
  rowIndex,
}: EventResizeHookParams) {
  const eventBus = useEventBus();
  const {
    isDraggingEnd,
    isDraggingCanceled,
    draggingEvent: resizingStartUIModel,
    clearDraggingEvent,
  } = useDraggingEvent('dayGrid', 'resize');
  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const [guideProps, setGuideProps] = useState<[EventUIModel, string] | null>(null); // Shadow -> Guide

  const clearStates = useCallback(() => {
    setGuideProps(null);
    clearCurrentGridPos();
    clearDraggingEvent();
  }, [clearCurrentGridPos, clearDraggingEvent]);

  const baseResizingInfo = useMemo(() => {
    if (isNil(resizingStartUIModel)) {
      return null;
    }
    /**
     * Filter UIModels that are made from the target event.
     */
    const resizeTargetUIModelRows = renderedUIModels.map(
      ({ uiModels }) =>
        uiModels.filter(
          (uiModel) => uiModel.cid() === resizingStartUIModel.cid()
        ) as FilteredUIModelRow
    );

    const eventStartDateRowIndex = resizeTargetUIModelRows.findIndex((row) => row.length > 0);
    const eventEndDateRowIndex = findLastIndex(resizeTargetUIModelRows, (row) => row.length > 0);
    const eventStartUIModelPos = getRowPosOfUIModel(
      resizeTargetUIModelRows[eventStartDateRowIndex][0] as EventUIModel,
      dateMatrix[eventStartDateRowIndex]
    );
    const eventEndUIModelPos = getRowPosOfUIModel(
      resizeTargetUIModelRows[eventEndDateRowIndex][0] as EventUIModel,
      dateMatrix[eventEndDateRowIndex]
    );

    return {
      eventStartDateColumnIndex: eventStartUIModelPos.startColumnIndex,
      eventStartDateRowIndex,
      eventEndDateColumnIndex: eventEndUIModelPos.endColumnIndex,
      eventEndDateRowIndex,
      resizeTargetUIModelRows,
    };
  }, [dateMatrix, renderedUIModels, resizingStartUIModel]);

  const canCalculateProps =
    isPresent(baseResizingInfo) && isPresent(resizingStartUIModel) && isPresent(currentGridPos);

  // Calculate the first row of the dragging event
  useEffect(() => {
    if (canCalculateProps && rowIndex === baseResizingInfo.eventStartDateRowIndex) {
      const { eventStartDateRowIndex, eventStartDateColumnIndex } = baseResizingInfo;
      const clonedUIModel = (
        baseResizingInfo.resizeTargetUIModelRows[eventStartDateRowIndex][0] as EventUIModel
      ).clone();

      let height: string;
      if (eventStartDateRowIndex === currentGridPos.rowIndex) {
        height =
          cellWidthMap[eventStartDateColumnIndex][
            Math.max(eventStartDateColumnIndex, currentGridPos.columnIndex)
          ];
      } else if (eventStartDateRowIndex > currentGridPos.rowIndex) {
        height = cellWidthMap[eventStartDateColumnIndex][eventStartDateColumnIndex];
      } else {
        height = cellWidthMap[eventStartDateColumnIndex][dateMatrix[rowIndex].length - 1];
        clonedUIModel.setUIProps({ exceedRight: true });
      }

      setGuideProps([clonedUIModel, height]);
    }
  }, [baseResizingInfo, canCalculateProps, cellWidthMap, currentGridPos, dateMatrix, rowIndex]);

  // Calculate middle rows of the dragging event
  useEffect(() => {
    if (
      canCalculateProps &&
      baseResizingInfo.eventStartDateRowIndex < rowIndex &&
      rowIndex < currentGridPos.rowIndex
    ) {
      const clonedUIModel = resizingStartUIModel.clone();
      clonedUIModel.setUIProps({ left: 0, exceedLeft: true, exceedRight: true });
      setGuideProps([clonedUIModel, '100%']);
    }
  }, [baseResizingInfo, canCalculateProps, currentGridPos, resizingStartUIModel, rowIndex]);

  // Calculate the last row of the dragging event
  useEffect(() => {
    if (
      canCalculateProps &&
      baseResizingInfo.eventStartDateRowIndex < currentGridPos.rowIndex &&
      rowIndex === currentGridPos.rowIndex
    ) {
      const clonedUIModel = resizingStartUIModel.clone();
      clonedUIModel.setUIProps({ left: 0, exceedLeft: true });
      setGuideProps([clonedUIModel, cellWidthMap[0][currentGridPos.columnIndex]]);
    }
  }, [
    baseResizingInfo,
    canCalculateProps,
    cellWidthMap,
    currentGridPos,
    resizingStartUIModel,
    rowIndex,
  ]);

  // Reset props on out of bound
  useEffect(() => {
    if (
      canCalculateProps &&
      rowIndex > baseResizingInfo.eventStartDateRowIndex &&
      rowIndex > currentGridPos.rowIndex
    ) {
      setGuideProps(null);
    }
  }, [canCalculateProps, currentGridPos, baseResizingInfo, rowIndex]);

  useWhen(() => {
    if (canCalculateProps) {
      /**
       * Is current grid position is the same or later comparing to the position of the start date?
       */
      const { eventStartDateColumnIndex, eventStartDateRowIndex } = baseResizingInfo;
      const shouldUpdate =
        !isDraggingCanceled &&
        ((currentGridPos.rowIndex === eventStartDateRowIndex &&
          currentGridPos.columnIndex >= eventStartDateColumnIndex) ||
          currentGridPos.rowIndex > eventStartDateRowIndex);

      if (shouldUpdate) {
        const targetEndDate = dateMatrix[currentGridPos.rowIndex][currentGridPos.columnIndex];

        eventBus.fire('beforeUpdateEvent', {
          event: resizingStartUIModel.model.toEventObject(),
          changes: {
            end: targetEndDate,
          },
        });
      }
    }

    clearStates();
  }, isDraggingEnd);

  return guideProps;
}
