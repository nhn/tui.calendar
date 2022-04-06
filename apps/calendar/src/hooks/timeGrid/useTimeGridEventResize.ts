import { ComponentProps } from 'preact';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';

import type { ResizingGuideByColumn } from '@src/components/timeGrid/resizingGuideByColumn';
import { useDispatch } from '@src/contexts/calendarStore';
import { useWhen } from '@src/hooks/common/useWhen';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/useCurrentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/useDraggingEvent';
import type EventUIModel from '@src/model/eventUIModel';
import type TZDate from '@src/time/date';
import { setTimeStrToDate } from '@src/time/datetime';
import { findLastIndex } from '@src/utils/array';
import { isNil, isPresent } from '@src/utils/type';

import type { TimeGridRow } from '@t/grid';

type FilteredUIModelRow = [] | [EventUIModel];

export function useTimeGridEventResize({
  gridPositionFinder,
  totalUIModels,
  columnIndex,
  timeGridData,
}: ComponentProps<typeof ResizingGuideByColumn>) {
  const { updateEvent } = useDispatch('calendar');
  const {
    isDraggingEnd,
    draggingEvent: resizingStartUIModel,
    clearDraggingEvent,
  } = useDraggingEvent('timeGrid', 'resize');
  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const [guideUIModel, setGuideUIModel] = useState<EventUIModel | null>(null);

  const clearStates = useCallback(() => {
    setGuideUIModel(null);
    clearDraggingEvent();
    clearCurrentGridPos();
  }, [clearCurrentGridPos, clearDraggingEvent]);

  const baseResizingInfo = useMemo(() => {
    if (isNil(resizingStartUIModel)) {
      return null;
    }

    const { columns, rows } = timeGridData;

    /**
     * Filter UIModels that are made from the target event.
     */
    const resizeTargetUIModelColumns = totalUIModels.map(
      (uiModels) =>
        uiModels.filter(
          (uiModel) => uiModel.cid() === resizingStartUIModel.cid()
        ) as FilteredUIModelRow
    );

    const findRowIndexOf =
      (targetDate: TZDate, targetColumnIndex: number) => (row: TimeGridRow) => {
        const rowStartTZDate = setTimeStrToDate(columns[targetColumnIndex].date, row.startTime);
        const rowEndTZDate = setTimeStrToDate(
          timeGridData.columns[targetColumnIndex].date,
          row.endTime
        );

        return rowStartTZDate <= targetDate && targetDate < rowEndTZDate;
      };
    const eventStartDateColumnIndex = resizeTargetUIModelColumns.findIndex((row) => row.length > 0);
    const startTZDate = (
      resizeTargetUIModelColumns[eventStartDateColumnIndex][0] as EventUIModel
    ).getStarts();
    let eventStartDateRowIndex = rows.findIndex(
      findRowIndexOf(startTZDate, eventStartDateColumnIndex)
    ); // when it is -1, the event starts before the current view.
    eventStartDateRowIndex = eventStartDateRowIndex >= 0 ? eventStartDateRowIndex : 0;
    const eventEndDateColumnIndex = findLastIndex(
      resizeTargetUIModelColumns,
      (row) => row.length > 0
    );
    const endTZDate = (
      resizeTargetUIModelColumns[eventEndDateColumnIndex][0] as EventUIModel
    ).getEnds();
    let eventEndDateRowIndex = rows.findIndex(findRowIndexOf(endTZDate, eventEndDateColumnIndex)); // when it is -1, the event ends after the current view.
    eventEndDateRowIndex = eventEndDateRowIndex >= 0 ? eventEndDateRowIndex : rows.length - 1;

    return {
      eventStartDateColumnIndex,
      eventStartDateRowIndex,
      eventEndDateColumnIndex,
      eventEndDateRowIndex,
      resizeTargetUIModelColumns,
    };
  }, [resizingStartUIModel, timeGridData, totalUIModels]);

  const canCalculateGuideUIModel =
    isPresent(baseResizingInfo) && isPresent(resizingStartUIModel) && isPresent(currentGridPos);

  const minimumHeight = useMemo(
    () => (baseResizingInfo ? timeGridData.rows[0].height : 0),
    [baseResizingInfo, timeGridData.rows]
  );

  // When drag an one-day event
  useEffect(() => {
    if (canCalculateGuideUIModel) {
      const { eventStartDateRowIndex, eventStartDateColumnIndex, eventEndDateColumnIndex } =
        baseResizingInfo;
      if (
        columnIndex === eventEndDateColumnIndex &&
        eventStartDateColumnIndex === eventEndDateColumnIndex
      ) {
        const clonedUIModel = resizingStartUIModel.clone();
        clonedUIModel.setUIProps({
          height: Math.max(
            minimumHeight,
            timeGridData.rows[currentGridPos.rowIndex].top -
              timeGridData.rows[eventStartDateRowIndex].top +
              minimumHeight
          ),
        });
        setGuideUIModel(clonedUIModel);
      }
    }
  }, [
    baseResizingInfo,
    canCalculateGuideUIModel,
    columnIndex,
    currentGridPos,
    resizingStartUIModel,
    timeGridData.rows,
    minimumHeight,
  ]);

  // When drag a two-day event (but less than 24 hours)
  useEffect(() => {
    if (canCalculateGuideUIModel) {
      const { resizeTargetUIModelColumns, eventStartDateColumnIndex, eventEndDateColumnIndex } =
        baseResizingInfo;
      if (
        (columnIndex === eventStartDateColumnIndex || columnIndex === eventEndDateColumnIndex) &&
        eventStartDateColumnIndex !== eventEndDateColumnIndex
      ) {
        let clonedUIModel;
        if (columnIndex === eventStartDateColumnIndex) {
          // first column
          clonedUIModel = (resizeTargetUIModelColumns[columnIndex][0] as EventUIModel).clone();
        } else {
          // last column
          clonedUIModel = resizingStartUIModel.clone();
          clonedUIModel.setUIProps({
            height: timeGridData.rows[currentGridPos.rowIndex].top + minimumHeight,
          });
        }
        setGuideUIModel(clonedUIModel);
      }
    }
  }, [
    baseResizingInfo,
    canCalculateGuideUIModel,
    columnIndex,
    currentGridPos,
    resizingStartUIModel,
    timeGridData.rows,
    minimumHeight,
  ]);

  useWhen(() => {
    const shouldUpdate =
      isPresent(baseResizingInfo) &&
      isPresent(currentGridPos) &&
      isPresent(resizingStartUIModel) &&
      baseResizingInfo.eventEndDateColumnIndex === columnIndex;

    if (shouldUpdate) {
      const { eventEndDateColumnIndex, eventStartDateRowIndex, eventStartDateColumnIndex } =
        baseResizingInfo;
      const targetEndDate = setTimeStrToDate(
        timeGridData.columns[columnIndex].date,
        timeGridData.rows[
          eventStartDateColumnIndex === eventEndDateColumnIndex
            ? Math.max(currentGridPos.rowIndex, eventStartDateRowIndex)
            : currentGridPos.rowIndex
        ].endTime
      );
      updateEvent({
        event: resizingStartUIModel.model,
        eventData: {
          end: targetEndDate,
        },
      });
    }

    clearStates();
  }, isDraggingEnd);

  return guideUIModel;
}
