import { useCallback, useEffect, useState } from 'preact/hooks';

import { KEY } from '@src/constants/keyboard';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { getGridDateIndex, getRenderedEventUIModels } from '@src/helpers/grid';
import { MousePositionDataGrabber } from '@src/helpers/view';
import { useKeydownEvent } from '@src/hooks/common/keydownEvent';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/currentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import EventUIModel from '@src/model/eventUIModel';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { findLastIndex } from '@src/utils/array';
import { isPresent } from '@src/utils/type';

import { GridPosition } from '@t/grid';

function getRowPosOfUIModel(uiModel: EventUIModel, dateRow: TZDate[]) {
  const startX = Math.max(getGridDateIndex(uiModel.getStarts(), dateRow), 0);
  const endX = getGridDateIndex(uiModel.getEnds(), dateRow);

  return {
    startX,
    endX,
  };
}

interface EventResizeHookParams {
  dateMatrix: TZDate[][];
  renderedUIModels: ReturnType<typeof getRenderedEventUIModels>[];
  cellWidthMap: string[][];
  mousePositionDataGrabber: MousePositionDataGrabber;
}

type FilteredUIModelRow = [] | [EventUIModel];
export type AvailableResizingEventShadowProps = [EventUIModel] | [EventUIModel, string];
type ResizingEventShadowProps = [] | AvailableResizingEventShadowProps;

interface ResizingState {
  eventStartDateX: number;
  eventStartDateY: number;
  lastUIModelStartX: number;
  lastUIModelEndX: number;
  lastUIModelY: number;
  lastUIModel: EventUIModel;
  resizeTargetUIModelRows: FilteredUIModelRow[];
}

export function hasResizingEventShadowProps(
  row: ResizingEventShadowProps | undefined
): row is AvailableResizingEventShadowProps {
  return isPresent(row) && row.length > 0;
}

function mapResizeShadowPropsOutOfRange({
  resizingState,
  cellWidthMap,
}: {
  resizingState: ResizingState;
  cellWidthMap: EventResizeHookParams['cellWidthMap'];
}): ResizingEventShadowProps[] {
  const { eventStartDateX, eventStartDateY, resizeTargetUIModelRows } = resizingState;

  return resizeTargetUIModelRows
    .slice(0, eventStartDateY + 1)
    .map((row) =>
      row.length > 0
        ? [row[0] as EventUIModel, cellWidthMap[eventStartDateX][eventStartDateX]]
        : row
    );
}

function mapResizeShadowPropsShrinking({
  filteredUIModelRows,
  lastAvailableUIModelRowIndex,
  dateMatrix,
  cellWidthMap,
  currentGridPos,
}: {
  filteredUIModelRows: FilteredUIModelRow[];
  lastAvailableUIModelRowIndex: number;
  dateMatrix: EventResizeHookParams['dateMatrix'];
  cellWidthMap: EventResizeHookParams['cellWidthMap'];
  currentGridPos: GridPosition;
}): ResizingEventShadowProps[] {
  return filteredUIModelRows.map((row, rowIndex) => {
    if (rowIndex === lastAvailableUIModelRowIndex) {
      const { startX } = getRowPosOfUIModel(row[0] as EventUIModel, dateMatrix[rowIndex]);

      return [row[0] as EventUIModel, cellWidthMap[startX][Math.max(startX, currentGridPos.x)]];
    }

    return row;
  });
}

function mapResizeShadowPropsSameRow({
  resizingState,
  cellWidthMap,
  currentGridPos,
}: {
  resizingState: ResizingState;
  cellWidthMap: EventResizeHookParams['cellWidthMap'];
  currentGridPos: GridPosition;
}): ResizingEventShadowProps[] {
  const { resizeTargetUIModelRows, lastUIModelY, lastUIModelStartX } = resizingState;

  return resizeTargetUIModelRows.map((row, rowIndex) =>
    rowIndex === lastUIModelY
      ? [
          row[0] as EventUIModel,
          cellWidthMap[lastUIModelStartX][Math.max(lastUIModelStartX, currentGridPos.x)],
        ]
      : row
  );
}

function mapResizingShadowPropsExtending({
  resizingState,
  dateMatrix,
  cellWidthMap,
  currentGridPos,
}: {
  resizingState: ResizingState;
  dateMatrix: EventResizeHookParams['dateMatrix'];
  cellWidthMap: EventResizeHookParams['cellWidthMap'];
  currentGridPos: GridPosition;
}): ResizingEventShadowProps[] {
  const { resizeTargetUIModelRows, lastUIModelY, lastUIModel } = resizingState;

  return resizeTargetUIModelRows.map((row, rowIndex) => {
    if (rowIndex < lastUIModelY) {
      return row;
    }

    if (rowIndex === lastUIModelY) {
      const dateRow = dateMatrix[rowIndex];
      const uiModel = row[0] as EventUIModel;
      const { startX } = getRowPosOfUIModel(uiModel, dateRow);

      return [uiModel, cellWidthMap[startX][dateRow.length - 1]];
    }

    if (lastUIModelY < rowIndex) {
      const clonedEventUIModel = lastUIModel.clone();
      clonedEventUIModel.setUIProps({ left: 0, exceedLeft: true });

      if (rowIndex < currentGridPos.y) {
        clonedEventUIModel.setUIProps({ exceedRight: true });

        return [clonedEventUIModel, '100%'];
      }

      if (rowIndex === currentGridPos.y) {
        return [clonedEventUIModel, cellWidthMap[0][currentGridPos.x]];
      }
    }

    return row;
  });
}

export function useDayGridMonthEventResize({
  dateMatrix,
  mousePositionDataGrabber,
  renderedUIModels,
  cellWidthMap,
}: EventResizeHookParams) {
  const { draggingState } = useStore(dndSelector);
  const { updateEvent } = useDispatch('calendar');
  const { draggingEvent: resizingStartUIModel, clearDraggingEvent } = useDraggingEvent('resize');
  const [currentGridPos, clearCurrentGridPos] =
    useCurrentPointerPositionInGrid(mousePositionDataGrabber);

  const [resizingState, setResizingState] = useState<ResizingState | null>(null);
  const [shadowProps, setShadowProps] = useState<ResizingEventShadowProps[] | null>(null);

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
        eventStartDateX: firstUIModelPos.startX,
        eventStartDateY: firstUIModelRowIndex,
        lastUIModelStartX: lastUIModelPos.startX,
        lastUIModelEndX: lastUIModelPos.endX,
        lastUIModelY: lastUIModelRowIndex,
        lastUIModel: resizingStartUIModel,
        resizeTargetUIModelRows,
      });
    }
  }, [dateMatrix, renderedUIModels, resizingStartUIModel]);

  const canCalculateProps = isPresent(resizingState) && isPresent(currentGridPos);

  useEffect(() => {
    const isOutOfBound =
      canCalculateProps &&
      (currentGridPos.y < resizingState.eventStartDateY ||
        (currentGridPos.y === resizingState.eventStartDateY &&
          currentGridPos.x < resizingState.eventStartDateX));
    if (isOutOfBound) {
      setShadowProps(
        mapResizeShadowPropsOutOfRange({
          resizingState,
          cellWidthMap,
        })
      );
    }
  }, [canCalculateProps, cellWidthMap, currentGridPos, resizingState]);

  useEffect(() => {
    const isShrinkingRows = canCalculateProps && currentGridPos.y < resizingState.lastUIModelY;
    if (isShrinkingRows) {
      const slicedTargetUIModelRows = resizingState.resizeTargetUIModelRows.slice(
        0,
        currentGridPos.y + 1
      );
      const lastAvailableUIModelRowIndex = findLastIndex(
        slicedTargetUIModelRows,
        (row) => row.length > 0
      );
      setShadowProps(
        mapResizeShadowPropsShrinking({
          filteredUIModelRows: slicedTargetUIModelRows,
          lastAvailableUIModelRowIndex,
          cellWidthMap,
          currentGridPos,
          dateMatrix,
        })
      );
    }
  }, [canCalculateProps, cellWidthMap, currentGridPos, dateMatrix, resizingState]);

  useEffect(() => {
    const isResizingInSameRow =
      canCalculateProps && currentGridPos.y === resizingState.lastUIModelY;
    if (isResizingInSameRow) {
      setShadowProps(
        mapResizeShadowPropsSameRow({
          resizingState,
          cellWidthMap,
          currentGridPos,
        })
      );
    }
  }, [canCalculateProps, cellWidthMap, currentGridPos, resizingState]);

  useEffect(() => {
    const isExtendingRows = canCalculateProps && currentGridPos.y > resizingState.lastUIModelY;
    if (isExtendingRows) {
      setShadowProps(
        mapResizingShadowPropsExtending({
          resizingState,
          dateMatrix,
          cellWidthMap,
          currentGridPos,
        })
      );
    }
  }, [canCalculateProps, cellWidthMap, currentGridPos, dateMatrix, resizingState]);

  useKeydownEvent(KEY.ESCAPE, clearStates);

  useEffect(() => {
    const isDraggingEnd =
      draggingState === DraggingState.IDLE && isPresent(resizingState) && isPresent(currentGridPos);
    if (isDraggingEnd) {
      /**
       * Is current grid position is the same or later comparing to the position of the start date?
       */
      const { eventStartDateX, eventStartDateY, lastUIModel } = resizingState;
      const shouldUpdate =
        (currentGridPos.y === eventStartDateY && currentGridPos.x >= eventStartDateX) ||
        currentGridPos.y > eventStartDateY;

      if (shouldUpdate) {
        const targetEndDate = dateMatrix[currentGridPos.y][currentGridPos.x];
        updateEvent({
          event: lastUIModel.model,
          eventData: {
            end: targetEndDate,
          },
        });
      }

      clearStates();
    }
  }, [clearStates, currentGridPos, dateMatrix, draggingState, resizingState, updateEvent]);

  return {
    // To control re-render timing of `MonthEvents` component
    resizingEvent: shadowProps ? resizingStartUIModel : null,
    resizingEventShadowProps: shadowProps,
  };
}
