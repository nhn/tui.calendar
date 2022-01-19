import { useEffect, useMemo, useState } from 'preact/hooks';

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

type DraggingUIModelGridPosition = { startX: number; endX: number; y: number };
type FilteredUIModelRow = [] | [EventUIModel];
export type AvailableResizingEventShadowProps = [EventUIModel] | [EventUIModel, string];
type ResizingEventShadowProps = [] | AvailableResizingEventShadowProps;

export function hasResizingEventShadowProps(
  row: ResizingEventShadowProps | undefined
): row is AvailableResizingEventShadowProps {
  return isPresent(row) && row.length > 0;
}

function mapResizeShadowPropsOutOfRange({
  resizeTargetUIModelRows,
  resizingEventStartDatePos,
  cellWidthMap,
}: {
  resizeTargetUIModelRows: FilteredUIModelRow[];
  resizingEventStartDatePos: GridPosition;
  cellWidthMap: EventResizeHookParams['cellWidthMap'];
}): ResizingEventShadowProps[] {
  const { x, y } = resizingEventStartDatePos;

  return resizeTargetUIModelRows
    .slice(0, y + 1)
    .map((row) => (row.length > 0 ? [row[0] as EventUIModel, cellWidthMap[x][x]] : row));
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
  filteredUIModelRows,
  draggingStartUIModelGridPos,
  cellWidthMap,
  currentGridPos,
}: {
  filteredUIModelRows: FilteredUIModelRow[];
  draggingStartUIModelGridPos: DraggingUIModelGridPosition;
  cellWidthMap: EventResizeHookParams['cellWidthMap'];
  currentGridPos: GridPosition;
}): ResizingEventShadowProps[] {
  return filteredUIModelRows.map((row, rowIndex) =>
    rowIndex === draggingStartUIModelGridPos.y
      ? [
          row[0] as EventUIModel,
          cellWidthMap[draggingStartUIModelGridPos.startX][
            Math.max(draggingStartUIModelGridPos.startX, currentGridPos.x)
          ],
        ]
      : row
  );
}

function mapResizingShadowPropsExtending({
  filteredUIModelRows,
  draggingStartUIModelGridPos,
  dateMatrix,
  cellWidthMap,
  draggingStartUIModel,
  currentGridPos,
}: {
  filteredUIModelRows: FilteredUIModelRow[];
  draggingStartUIModelGridPos: DraggingUIModelGridPosition;
  dateMatrix: EventResizeHookParams['dateMatrix'];
  cellWidthMap: EventResizeHookParams['cellWidthMap'];
  draggingStartUIModel: EventUIModel;
  currentGridPos: GridPosition;
}): ResizingEventShadowProps[] {
  return filteredUIModelRows.map((row, rowIndex) => {
    if (rowIndex < draggingStartUIModelGridPos.y) {
      return row;
    }

    if (rowIndex === draggingStartUIModelGridPos.y) {
      const dateRow = dateMatrix[rowIndex];
      const uiModel = row[0] as EventUIModel;
      const { startX } = getRowPosOfUIModel(uiModel, dateRow);

      return [uiModel, cellWidthMap[startX][dateRow.length - 1]];
    }

    if (draggingStartUIModelGridPos.y < rowIndex) {
      const clonedEventUIModel = draggingStartUIModel.clone();
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
  const { initX, initY, draggingState } = useStore(dndSelector);
  const { updateEvent } = useDispatch('calendar');
  const { draggingEvent: draggingStartUIModel, clearDraggingEvent } = useDraggingEvent('resize');
  const [currentGridPos, clearCurrentGridPos] =
    useCurrentPointerPositionInGrid(mousePositionDataGrabber);

  const [resizingEventStartDatePos, setResizingEventStartDatePos] = useState<GridPosition | null>(
    null
  );
  const [draggingStartUIModelGridPos, setDraggingStartUIModelGridPos] =
    useState<DraggingUIModelGridPosition | null>(null);

  /**
   * Filter UIModels that are made from the target event.
   */
  const resizeTargetUIModelRows = useMemo(
    () =>
      isPresent(draggingStartUIModel)
        ? renderedUIModels.map(
            ({ uiModels }) =>
              uiModels.filter(
                (uiModel) => uiModel.cid() === draggingStartUIModel.cid()
              ) as FilteredUIModelRow
          )
        : null,
    [renderedUIModels, draggingStartUIModel]
  );

  /**
   * Save the start position of the target event.
   */
  useEffect(() => {
    if (isPresent(resizeTargetUIModelRows)) {
      const firstAvailableUIModelRowIndex = resizeTargetUIModelRows.findIndex(
        (row) => row.length > 0
      );
      const { startX } = getRowPosOfUIModel(
        resizeTargetUIModelRows[firstAvailableUIModelRowIndex][0] as EventUIModel,
        dateMatrix[firstAvailableUIModelRowIndex]
      );

      setResizingEventStartDatePos({
        x: startX,
        y: firstAvailableUIModelRowIndex,
      });
    }
  }, [dateMatrix, resizeTargetUIModelRows]);

  useEffect(() => {
    const hasInitCoords = isPresent(initX) && isPresent(initY);

    if (isPresent(draggingStartUIModel) && hasInitCoords) {
      const pos = mousePositionDataGrabber({ clientX: initX, clientY: initY } as MouseEvent);

      if (pos) {
        const targetEventGridY = pos.gridY;
        const row = dateMatrix[targetEventGridY];
        const { startX, endX } = getRowPosOfUIModel(draggingStartUIModel, row);

        setDraggingStartUIModelGridPos({ startX, endX, y: targetEventGridY });
      }
    }
  }, [dateMatrix, initX, initY, mousePositionDataGrabber, draggingStartUIModel]);

  useKeydownEvent(KEY.ESCAPE, () => {
    setResizingEventStartDatePos(null);
    setDraggingStartUIModelGridPos(null);
    clearCurrentGridPos();
    clearDraggingEvent();
  });

  useEffect(() => {
    const isDraggingEnd =
      draggingState === DraggingState.IDLE &&
      isPresent(resizingEventStartDatePos) &&
      isPresent(draggingStartUIModel) &&
      isPresent(currentGridPos);
    if (isDraggingEnd) {
      /**
       * Is current grid position is the same or later comparing to the position of the start date?
       */
      const shouldUpdate =
        (currentGridPos.y === resizingEventStartDatePos.y &&
          currentGridPos.x >= resizingEventStartDatePos.x) ||
        currentGridPos.y > resizingEventStartDatePos.y;

      if (shouldUpdate) {
        const targetEndDate = dateMatrix[currentGridPos.y][currentGridPos.x];
        updateEvent({
          event: draggingStartUIModel.model,
          eventData: {
            end: targetEndDate,
          },
        });
      }

      setResizingEventStartDatePos(null);
      setDraggingStartUIModelGridPos(null);
      clearCurrentGridPos();
      clearDraggingEvent();
    }
  }, [
    clearCurrentGridPos,
    clearDraggingEvent,
    currentGridPos,
    dateMatrix,
    draggingStartUIModel,
    draggingState,
    resizingEventStartDatePos,
    updateEvent,
  ]);

  const canCalculateShadowProps =
    isPresent(resizeTargetUIModelRows) &&
    isPresent(resizingEventStartDatePos) &&
    isPresent(draggingStartUIModel) &&
    isPresent(draggingStartUIModelGridPos) &&
    isPresent(currentGridPos);
  const resizingEventShadowProps = useMemo(() => {
    if (canCalculateShadowProps) {
      /**
       * When resizing is not possible, fix the shadow position to the start of the event.
       */
      if (
        currentGridPos.y < resizingEventStartDatePos.y ||
        (currentGridPos.y === resizingEventStartDatePos.y &&
          currentGridPos.x < resizingEventStartDatePos.x)
      ) {
        return mapResizeShadowPropsOutOfRange({
          resizeTargetUIModelRows,
          resizingEventStartDatePos,
          cellWidthMap,
        });
      }

      /**
       * When resizing is available and the current position is above the start position.
       */
      if (currentGridPos.y < draggingStartUIModelGridPos.y) {
        const slicedTargetUIModelRows = resizeTargetUIModelRows.slice(0, currentGridPos.y + 1);
        const lastAvailableUIModelRowIndex = findLastIndex(
          slicedTargetUIModelRows,
          (row) => row.length > 0
        );
        return mapResizeShadowPropsShrinking({
          filteredUIModelRows: slicedTargetUIModelRows,
          lastAvailableUIModelRowIndex,
          dateMatrix,
          cellWidthMap,
          currentGridPos,
        });
      }

      /**
       * When resizing is available and the current position is in the same row as the start position.
       */
      if (currentGridPos.y === draggingStartUIModelGridPos.y) {
        return mapResizeShadowPropsSameRow({
          filteredUIModelRows: resizeTargetUIModelRows,
          draggingStartUIModelGridPos,
          cellWidthMap,
          currentGridPos,
        });
      }

      /**
       * When resizing is available and the current position is below the start position.
       */
      if (currentGridPos.y > draggingStartUIModelGridPos.y) {
        return mapResizingShadowPropsExtending({
          filteredUIModelRows: resizeTargetUIModelRows,
          draggingStartUIModelGridPos,
          dateMatrix,
          cellWidthMap,
          draggingStartUIModel,
          currentGridPos,
        });
      }
    }

    return resizeTargetUIModelRows;
  }, [
    canCalculateShadowProps,
    cellWidthMap,
    currentGridPos,
    dateMatrix,
    draggingStartUIModel,
    draggingStartUIModelGridPos,
    resizeTargetUIModelRows,
    resizingEventStartDatePos,
  ]);

  return resizingEventShadowProps;
}
