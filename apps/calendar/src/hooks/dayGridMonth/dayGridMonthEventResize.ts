import { useCallback, useEffect, useState } from 'preact/hooks';

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
import { isPresent } from '@src/utils/type';

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

interface ResizingState {
  eventStartDateColumnIndex: number;
  eventStartDateRowIndex: number;
  lastUIModelStartColumnIndex: number;
  lastUIModelEndColumnIndex: number;
  lastUIModelRowIndex: number;
  lastUIModel: EventUIModel;
  resizeTargetUIModelRows: FilteredUIModelRow[];
}

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

  const [resizingState, setResizingState] = useState<ResizingState | null>(null);
  const [shadowProps, setShadowProps] = useState<[EventUIModel, string] | null>(null);

  const clearStates = useCallback(() => {
    setShadowProps(null);
    setResizingState(null);
    clearCurrentGridPos();
    clearDraggingEvent();
  }, [clearCurrentGridPos, clearDraggingEvent]);

  useEffect(() => {
    if (isPresent(resizingStartUIModel)) {
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

      setResizingState({
        eventStartDateColumnIndex: firstUIModelPos.startColumnIndex,
        eventStartDateRowIndex: firstUIModelRowIndex,
        lastUIModelStartColumnIndex: lastUIModelPos.startColumnIndex,
        lastUIModelEndColumnIndex: lastUIModelPos.endColumnIndex,
        lastUIModelRowIndex,
        lastUIModel: resizingStartUIModel,
        resizeTargetUIModelRows,
      });
    }
  }, [dateMatrix, renderedUIModels, resizingStartUIModel]);

  const canCalculateProps = isPresent(resizingState) && isPresent(currentGridPos);

  useEffect(() => {
    // Calculate the first row of the dragging event
    if (canCalculateProps && rowIndex === resizingState.eventStartDateRowIndex) {
      const { eventStartDateRowIndex, eventStartDateColumnIndex } = resizingState;
      const clonedUIModel = (
        resizingState.resizeTargetUIModelRows[eventStartDateRowIndex][0] as EventUIModel
      ).clone();
      if (eventStartDateRowIndex === currentGridPos.rowIndex) {
        setShadowProps([
          clonedUIModel,
          cellWidthMap[eventStartDateColumnIndex][
            Math.max(eventStartDateColumnIndex, currentGridPos.columnIndex)
          ],
        ]);
      } else {
        clonedUIModel.setUIProps({ exceedRight: true });
        setShadowProps([
          clonedUIModel,
          cellWidthMap[eventStartDateColumnIndex][dateMatrix[rowIndex].length - 1],
        ]);
      }
    }
  }, [canCalculateProps, cellWidthMap, currentGridPos, dateMatrix, resizingState, rowIndex]);

  useEffect(() => {
    // Calculate middle rows of the dragging event
    if (
      canCalculateProps &&
      resizingState.eventStartDateRowIndex < rowIndex &&
      rowIndex < currentGridPos.rowIndex
    ) {
      const clonedUIModel = resizingState.lastUIModel.clone();
      clonedUIModel.setUIProps({ left: 0, exceedLeft: true, exceedRight: true });
      setShadowProps([clonedUIModel, '100%']);
    }
  }, [canCalculateProps, currentGridPos, resizingState, rowIndex]);

  useEffect(() => {
    // Calculate the last row of the dragging event
    if (
      canCalculateProps &&
      resizingState.eventStartDateRowIndex < currentGridPos.rowIndex &&
      rowIndex === currentGridPos.rowIndex
    ) {
      const { lastUIModel } = resizingState;
      const clonedUIModel = lastUIModel.clone();
      clonedUIModel.setUIProps({ left: 0, exceedLeft: true });
      setShadowProps([clonedUIModel, cellWidthMap[0][currentGridPos.columnIndex]]);
    }
  }, [canCalculateProps, cellWidthMap, currentGridPos, resizingState, rowIndex]);

  useEffect(() => {
    if (
      canCalculateProps &&
      (rowIndex < resizingState.eventStartDateRowIndex || rowIndex > currentGridPos.rowIndex)
    ) {
      setShadowProps(null);
    }
  }, [canCalculateProps, currentGridPos, resizingState, rowIndex]);

  useKeydownEvent(KEY.ESCAPE, clearStates);

  useEffect(() => {
    const isDraggingEnd = isNotDragging && isPresent(resizingState) && isPresent(currentGridPos);
    if (isDraggingEnd) {
      /**
       * Is current grid position is the same or later comparing to the position of the start date?
       */
      const { eventStartDateColumnIndex, eventStartDateRowIndex, lastUIModel } = resizingState;
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
  }, [clearStates, currentGridPos, dateMatrix, isNotDragging, resizingState, updateEvent]);

  return shadowProps;
}
