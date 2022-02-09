import { useCallback, useEffect, useState } from 'preact/hooks';

import { KEY } from '@src/constants/keyboard';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { getGridDateIndex, getRenderedEventUIModels } from '@src/helpers/grid';
import { GridPositionFinder } from '@src/helpers/view';
import { useKeydownEvent } from '@src/hooks/common/keydownEvent';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/currentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import EventUIModel from '@src/model/eventUIModel';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { findLastIndex } from '@src/utils/array';
import { isPresent } from '@src/utils/type';

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
}

type FilteredUIModelRow = [] | [EventUIModel];
export type AvailableResizingEventShadowProps = [EventUIModel] | [EventUIModel, string];
type ResizingEventShadowProps = [] | AvailableResizingEventShadowProps;

interface ResizingState {
  eventStartDateColumnIndex: number;
  eventStartDateRowIndex: number;
  lastUIModelStartColumnIndex: number;
  lastUIModelEndRowIndex: number;
  lastUIModelRowIndex: number;
  lastUIModel: EventUIModel;
  resizeTargetUIModelRows: FilteredUIModelRow[];
}

export function hasResizingEventShadowProps(
  row: ResizingEventShadowProps | undefined
): row is AvailableResizingEventShadowProps {
  return isPresent(row) && row.length > 0;
}

export function useDayGridMonthEventResize({
  dateMatrix,
  gridPositionFinder,
  renderedUIModels,
  cellWidthMap,
}: EventResizeHookParams) {
  const { draggingState } = useStore(dndSelector);
  const { updateEvent } = useDispatch('calendar');
  const { draggingEvent: resizingStartUIModel, clearDraggingEvent } = useDraggingEvent('resize');
  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);

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
        eventStartDateColumnIndex: firstUIModelPos.startColumnIndex,
        eventStartDateRowIndex: firstUIModelRowIndex,
        lastUIModelStartColumnIndex: lastUIModelPos.startColumnIndex,
        lastUIModelEndRowIndex: lastUIModelPos.endColumnIndex,
        lastUIModelRowIndex,
        lastUIModel: resizingStartUIModel,
        resizeTargetUIModelRows,
      });
    }
  }, [dateMatrix, renderedUIModels, resizingStartUIModel]);

  const canCalculateProps = isPresent(resizingState) && isPresent(currentGridPos);

  useEffect(() => {
    const isShrinkingRows =
      canCalculateProps && currentGridPos.rowIndex < resizingState.lastUIModelRowIndex;
    if (isShrinkingRows) {
      const { resizeTargetUIModelRows, eventStartDateRowIndex } = resizingState;
      const slicedTargetUIModelRows = resizeTargetUIModelRows.slice(
        0,
        Math.max(eventStartDateRowIndex, currentGridPos.rowIndex) + 1
      );
      const lastAvailableUIModelRowIndex = findLastIndex(
        slicedTargetUIModelRows,
        (row) => row.length > 0
      );
      setShadowProps(
        slicedTargetUIModelRows.map((row, rowIndex) => {
          if (rowIndex === lastAvailableUIModelRowIndex) {
            const { startColumnIndex } = getRowPosOfUIModel(
              row[0] as EventUIModel,
              dateMatrix[rowIndex]
            );

            return [
              row[0] as EventUIModel,
              cellWidthMap[startColumnIndex][
                Math.max(startColumnIndex, currentGridPos.columnIndex)
              ],
            ];
          }

          return row;
        })
      );
    }
  }, [canCalculateProps, cellWidthMap, currentGridPos, dateMatrix, resizingState]);

  useEffect(() => {
    const isExtendingOrSameRows =
      canCalculateProps && currentGridPos.columnIndex >= resizingState.lastUIModelRowIndex;
    if (isExtendingOrSameRows) {
      const {
        resizeTargetUIModelRows,
        lastUIModelStartColumnIndex,
        lastUIModelRowIndex,
        lastUIModel,
      } = resizingState;
      setShadowProps(
        resizeTargetUIModelRows.map((row, rowIndex) => {
          if (rowIndex < lastUIModelRowIndex) {
            return row;
          }

          if (rowIndex === lastUIModelRowIndex) {
            const dateRow = dateMatrix[rowIndex];
            const uiModel = row[0] as EventUIModel;

            return [
              uiModel,
              cellWidthMap[lastUIModelStartColumnIndex][
                currentGridPos.rowIndex === lastUIModelRowIndex
                  ? Math.max(currentGridPos.columnIndex, lastUIModelStartColumnIndex)
                  : dateRow.length - 1
              ],
            ];
          }

          if (lastUIModelRowIndex < rowIndex) {
            const clonedEventUIModel = lastUIModel.clone();
            clonedEventUIModel.setUIProps({ left: 0, exceedLeft: true });

            if (rowIndex < currentGridPos.rowIndex) {
              clonedEventUIModel.setUIProps({ exceedRight: true });

              return [clonedEventUIModel, '100%'];
            }

            if (rowIndex === currentGridPos.rowIndex) {
              return [clonedEventUIModel, cellWidthMap[0][currentGridPos.columnIndex]];
            }
          }

          return row;
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
      const { eventStartDateColumnIndex, eventStartDateRowIndex, lastUIModel } = resizingState;
      const shouldUpdate =
        (currentGridPos.rowIndex === eventStartDateRowIndex &&
          currentGridPos.columnIndex >= eventStartDateColumnIndex) ||
        currentGridPos.rowIndex > eventStartDateRowIndex;

      if (shouldUpdate) {
        const targetEndDate = dateMatrix[currentGridPos.rowIndex][currentGridPos.rowIndex];
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
