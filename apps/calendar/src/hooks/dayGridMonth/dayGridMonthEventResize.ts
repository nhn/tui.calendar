import { useEffect, useMemo, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { getGridDateIndex, getRenderedEventUIModels } from '@src/helpers/grid';
import { MousePositionDataGrabber } from '@src/helpers/view';
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

interface Params {
  dateMatrix: TZDate[][];
  renderedUIModels: ReturnType<typeof getRenderedEventUIModels>[];
  cellWidthMap: string[][];
  mousePositionDataGrabber: MousePositionDataGrabber;
}

export function useDayGridMonthEventResize({
  dateMatrix,
  mousePositionDataGrabber,
  renderedUIModels,
  cellWidthMap,
}: Params) {
  const { initX, initY, x, y, draggingState } = useStore(dndSelector);
  const { updateEvent } = useDispatch('calendar');
  const { draggingEvent: draggingStartUIModel, clearDraggingEvent } = useDraggingEvent('resize');

  const [currentGridPos, setCurrentGridPos] = useState<{ x: number; y: number } | null>(null);
  const [draggingStartUIModelGridPos, setDraggingStartUIModelGridPos] = useState<{
    startX: number;
    endX: number;
    y: number;
  } | null>(null);

  const targetUIModels: [EventUIModel][] | null = useMemo(
    () =>
      isPresent(draggingStartUIModel)
        ? renderedUIModels.map(
            ({ uiModels }) =>
              uiModels.filter((uiModel) => uiModel.cid() === draggingStartUIModel.cid()) as [
                EventUIModel
              ]
          )
        : null,
    [renderedUIModels, draggingStartUIModel]
  );
  const resizingData: ([EventUIModel] | [EventUIModel, string])[] | null = useMemo(() => {
    if (
      isPresent(targetUIModels) &&
      isPresent(draggingStartUIModelGridPos) &&
      isPresent(currentGridPos)
    ) {
      if (currentGridPos.y < draggingStartUIModelGridPos.y) {
        const cloneRange = targetUIModels.slice(0, currentGridPos.y + 1);
        const lastAvailableUIModelRowIndex = cloneRange.length - 1;
        return cloneRange.map((row, rowIndex) => {
          if (rowIndex === lastAvailableUIModelRowIndex) {
            const { startX } = getRowPosOfUIModel(row[0], dateMatrix[rowIndex]);
            return [row[0], cellWidthMap[startX][Math.max(startX, currentGridPos.x)]];
          }

          return row;
        });
      }
      if (currentGridPos.y === draggingStartUIModelGridPos.y) {
        return targetUIModels.map((row, rowIndex) =>
          row.length > 0 && rowIndex === draggingStartUIModelGridPos.y
            ? [
                row[0],
                cellWidthMap[draggingStartUIModelGridPos.startX][
                  Math.max(draggingStartUIModelGridPos.startX, currentGridPos.x)
                ],
              ]
            : row
        );
      }
    }

    return null;
  }, [cellWidthMap, currentGridPos, dateMatrix, draggingStartUIModelGridPos, targetUIModels]);

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

  useEffect(() => {
    const isDraggingEnd =
      draggingState === DraggingState.IDLE &&
      isPresent(draggingStartUIModel) &&
      isPresent(draggingStartUIModelGridPos) &&
      isPresent(currentGridPos);
    if (isDraggingEnd) {
      const shouldUpdate =
        draggingStartUIModelGridPos.startX <= currentGridPos.x &&
        currentGridPos.x !== draggingStartUIModelGridPos.endX;

      if (shouldUpdate) {
        const targetEndDate = dateMatrix[draggingStartUIModelGridPos.y][currentGridPos.x];
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
  ]);

  return {
    currentGridPos,
    resizingData,
  };
}
