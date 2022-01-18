import { useEffect, useMemo, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { getGridDateIndex, getRenderedEventUIModels } from '@src/helpers/grid';
import { MousePositionDataGrabber } from '@src/helpers/view';
import { useKeydownEvent } from '@src/hooks/common/keydownEvent';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import EventUIModel from '@src/model/eventUIModel';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { findLastIndex } from '@src/utils/array';
import { isPresent } from '@src/utils/type';

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

type GridPosition = { x: number; y: number };
type DraggingUIModelGridPosition = { startX: number; endX: number; y: number };
type FilteredUIModelRow = [] | [EventUIModel];
export type AvailableResizingEventShadowProps = [EventUIModel] | [EventUIModel, string];
type ResizingEventShadowProps = [] | AvailableResizingEventShadowProps;

export function hasResizingEventShadowProps(
  row: ResizingEventShadowProps | undefined
): row is AvailableResizingEventShadowProps {
  return isPresent(row) && row.length > 0;
}

function mapResizeShadowPropsWhenShrink({
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

      return [
        row[0] as EventUIModel,
        cellWidthMap[startX][
          currentGridPos.y < lastAvailableUIModelRowIndex
            ? startX
            : Math.max(startX, currentGridPos.x)
        ],
      ];
    }

    return row;
  });
}

function mapResizeShadowPropsWhenSame({
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

function mapResizingShadowPropsWhenExtend({
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
      const { startX } = getRowPosOfUIModel(row[0] as EventUIModel, dateMatrix[rowIndex]);

      return [row[0] as EventUIModel, cellWidthMap[startX][dateMatrix[rowIndex].length - 1]];
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
  const { initX, initY, x, y, draggingState } = useStore(dndSelector);
  const { updateEvent } = useDispatch('calendar');
  const { draggingEvent: draggingStartUIModel, clearDraggingEvent } = useDraggingEvent('resize');

  const [currentGridPos, setCurrentGridPos] = useState<GridPosition | null>(null);
  const [resizingEventStartDatePos, setResizingEventStartDatePos] = useState<GridPosition | null>(
    null
  );
  const [draggingStartUIModelGridPos, setDraggingStartUIModelGridPos] =
    useState<DraggingUIModelGridPosition | null>(null);

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

  useEffect(() => {
    if (isPresent(resizeTargetUIModelRows)) {
      const firstAvailableUIModelRowIndex = resizeTargetUIModelRows.findIndex(
        (row) => row.length > 0
      );
      const { startX } = getRowPosOfUIModel(
        (resizeTargetUIModelRows[firstAvailableUIModelRowIndex] as [EventUIModel])[0],
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

  useEffect(() => {
    const hasDraggingCoords = isPresent(x) && isPresent(y);

    if (isPresent(draggingStartUIModel) && hasDraggingCoords) {
      const pos = mousePositionDataGrabber({ clientX: x, clientY: y } as MouseEvent);

      if (pos) {
        setCurrentGridPos({ x: pos.gridX, y: pos.gridY });
      }
    }
  }, [mousePositionDataGrabber, draggingStartUIModel, x, y]);

  useKeydownEvent('Escape', () => {
    setResizingEventStartDatePos(null);
    setCurrentGridPos(null);
    setDraggingStartUIModelGridPos(null);
    clearDraggingEvent();
  });

  // eslint-disable-next-line complexity
  useEffect(() => {
    const isDraggingEnd =
      draggingState === DraggingState.IDLE &&
      isPresent(resizingEventStartDatePos) &&
      isPresent(draggingStartUIModel) &&
      isPresent(draggingStartUIModelGridPos) &&
      isPresent(currentGridPos);
    if (isDraggingEnd) {
      const shouldUpdate =
        resizingEventStartDatePos.y <= currentGridPos.y ||
        (resizingEventStartDatePos.y === currentGridPos.y &&
          resizingEventStartDatePos.x <= currentGridPos.x &&
          currentGridPos.x !== draggingStartUIModelGridPos.endX &&
          currentGridPos.y !== draggingStartUIModelGridPos.y);

      if (shouldUpdate) {
        const targetEndDate = dateMatrix[currentGridPos.y][currentGridPos.x];
        updateEvent({
          event: draggingStartUIModel.model,
          eventData: {
            end: targetEndDate,
          },
        });
      }

      setCurrentGridPos(null);
      clearDraggingEvent();
    }
  }, [
    clearDraggingEvent,
    currentGridPos,
    dateMatrix,
    draggingState,
    draggingStartUIModel,
    draggingStartUIModelGridPos,
    updateEvent,
    resizingEventStartDatePos,
  ]);

  const canCalculateShadowProps =
    isPresent(resizeTargetUIModelRows) &&
    isPresent(draggingStartUIModel) &&
    isPresent(draggingStartUIModelGridPos) &&
    isPresent(currentGridPos);
  return useMemo(() => {
    if (canCalculateShadowProps) {
      if (currentGridPos.y < draggingStartUIModelGridPos.y) {
        let slicedTargetUIModelRows = resizeTargetUIModelRows.slice(0, currentGridPos.y + 1);
        let lastAvailableUIModelRowIndex = findLastIndex(
          slicedTargetUIModelRows,
          (row) => row.length > 0
        );

        if (lastAvailableUIModelRowIndex === -1) {
          lastAvailableUIModelRowIndex = resizeTargetUIModelRows.findIndex((row) => row.length > 0);
          slicedTargetUIModelRows = resizeTargetUIModelRows.slice(
            0,
            lastAvailableUIModelRowIndex + 1
          );
        }

        return mapResizeShadowPropsWhenShrink({
          filteredUIModelRows: slicedTargetUIModelRows,
          lastAvailableUIModelRowIndex,
          dateMatrix,
          cellWidthMap,
          currentGridPos,
        });
      }

      if (currentGridPos.y === draggingStartUIModelGridPos.y) {
        return mapResizeShadowPropsWhenSame({
          filteredUIModelRows: resizeTargetUIModelRows,
          draggingStartUIModelGridPos,
          cellWidthMap,
          currentGridPos,
        });
      }

      if (currentGridPos.y > draggingStartUIModelGridPos.y) {
        return mapResizingShadowPropsWhenExtend({
          filteredUIModelRows: resizeTargetUIModelRows,
          draggingStartUIModelGridPos,
          dateMatrix,
          cellWidthMap,
          draggingStartUIModel,
          currentGridPos,
        });
      }
    }

    return null;
  }, [
    canCalculateShadowProps,
    currentGridPos,
    draggingStartUIModelGridPos,
    resizeTargetUIModelRows,
    dateMatrix,
    cellWidthMap,
    draggingStartUIModel,
  ]);
}
