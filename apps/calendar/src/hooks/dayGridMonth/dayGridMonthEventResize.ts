import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';

import { KEY } from '@src/constants/keyboard';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { getGridDateIndex, getRenderedEventUIModels } from '@src/helpers/grid';
import { useKeydownEvent } from '@src/hooks/common/keydownEvent';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/currentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import EventUIModel from '@src/model/eventUIModel';
import { isNotDraggingSelector } from '@src/selectors/dnd';
import TZDate from '@src/time/date';
import { findLastIndex } from '@src/utils/array';
import { isNil, isPresent } from '@src/utils/type';

import { GridPositionFinder } from '@t/grid';

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
  const isNotDragging = useStore(isNotDraggingSelector);
  const { updateEvent } = useDispatch('calendar');
  const { draggingEvent: resizingStartUIModel, clearDraggingEvent } = useDraggingEvent(
    'dayGrid',
    'resize'
  );
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

    const firstUIModelRowIndex = resizeTargetUIModelRows.findIndex((row) => row.length > 0);
    const lastUIModelRowIndex = findLastIndex(resizeTargetUIModelRows, (row) => row.length > 0);
    const firstUIModelPos = getRowPosOfUIModel(
      resizeTargetUIModelRows[firstUIModelRowIndex][0] as EventUIModel,
      dateMatrix[firstUIModelRowIndex]
    );
    const lastUIModelPos = getRowPosOfUIModel(
      resizeTargetUIModelRows[lastUIModelRowIndex][0] as EventUIModel,
      dateMatrix[lastUIModelRowIndex]
    );

    return {
      eventStartDateColumnIndex: firstUIModelPos.startColumnIndex,
      eventStartDateRowIndex: firstUIModelRowIndex,
      lastUIModelStartColumnIndex: lastUIModelPos.startColumnIndex,
      lastUIModelEndColumnIndex: lastUIModelPos.endColumnIndex,
      lastUIModelRowIndex,
      lastUIModel: resizingStartUIModel,
      resizeTargetUIModelRows,
    };
  }, [dateMatrix, renderedUIModels, resizingStartUIModel]);

  const canCalculateProps = isPresent(baseResizingInfo) && isPresent(currentGridPos);

  useEffect(() => {
    // @TODO: should handle the case when the position is upper bound of the event starting date
    // Calculate the first row of the dragging event
    if (canCalculateProps && rowIndex === baseResizingInfo.eventStartDateRowIndex) {
      const { eventStartDateRowIndex, eventStartDateColumnIndex } = baseResizingInfo;
      const clonedUIModel = (
        baseResizingInfo.resizeTargetUIModelRows[eventStartDateRowIndex][0] as EventUIModel
      ).clone();
      if (eventStartDateRowIndex === currentGridPos.rowIndex) {
        setGuideProps([
          clonedUIModel,
          cellWidthMap[eventStartDateColumnIndex][
            Math.max(eventStartDateColumnIndex, currentGridPos.columnIndex)
          ],
        ]);
      } else {
        clonedUIModel.setUIProps({ exceedRight: true });
        setGuideProps([
          clonedUIModel,
          cellWidthMap[eventStartDateColumnIndex][dateMatrix[rowIndex].length - 1],
        ]);
      }
    }
  }, [canCalculateProps, cellWidthMap, currentGridPos, dateMatrix, baseResizingInfo, rowIndex]);

  useEffect(() => {
    // Calculate middle rows of the dragging event
    if (
      canCalculateProps &&
      baseResizingInfo.eventStartDateRowIndex < rowIndex &&
      rowIndex < currentGridPos.rowIndex
    ) {
      const clonedUIModel = baseResizingInfo.lastUIModel.clone();
      clonedUIModel.setUIProps({ left: 0, exceedLeft: true, exceedRight: true });
      setGuideProps([clonedUIModel, '100%']);
    }
  }, [canCalculateProps, currentGridPos, baseResizingInfo, rowIndex]);

  useEffect(() => {
    // Calculate the last row of the dragging event
    if (
      canCalculateProps &&
      baseResizingInfo.eventStartDateRowIndex < currentGridPos.rowIndex &&
      rowIndex === currentGridPos.rowIndex
    ) {
      const { lastUIModel } = baseResizingInfo;
      const clonedUIModel = lastUIModel.clone();
      clonedUIModel.setUIProps({ left: 0, exceedLeft: true });
      setGuideProps([clonedUIModel, cellWidthMap[0][currentGridPos.columnIndex]]);
    }
  }, [canCalculateProps, cellWidthMap, currentGridPos, baseResizingInfo, rowIndex]);

  useEffect(() => {
    if (
      canCalculateProps &&
      (rowIndex < baseResizingInfo.eventStartDateRowIndex || rowIndex > currentGridPos.rowIndex)
    ) {
      setGuideProps(null);
    }
  }, [canCalculateProps, currentGridPos, baseResizingInfo, rowIndex]);

  useKeydownEvent(KEY.ESCAPE, clearStates);

  useEffect(() => {
    const isDraggingEnd = isNotDragging && isPresent(baseResizingInfo) && isPresent(currentGridPos);
    if (isDraggingEnd) {
      /**
       * Is current grid position is the same or later comparing to the position of the start date?
       */
      const { eventStartDateColumnIndex, eventStartDateRowIndex, lastUIModel } = baseResizingInfo;
      const shouldUpdate =
        (currentGridPos.rowIndex === eventStartDateRowIndex &&
          currentGridPos.columnIndex >= eventStartDateColumnIndex) ||
        currentGridPos.rowIndex > eventStartDateRowIndex;

      if (shouldUpdate) {
        const targetEndDate = dateMatrix[currentGridPos.rowIndex][currentGridPos.columnIndex];
        updateEvent({
          event: lastUIModel.model,
          eventData: {
            end: targetEndDate,
          },
        });
      }

      clearStates();
    }
  }, [clearStates, currentGridPos, dateMatrix, isNotDragging, baseResizingInfo, updateEvent]);

  return guideProps;
}
