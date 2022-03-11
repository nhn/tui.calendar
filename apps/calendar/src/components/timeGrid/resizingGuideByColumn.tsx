import { h } from 'preact';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';

import { TimeEvent } from '@src/components/events/timeEvent';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/currentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import EventUIModel from '@src/model/eventUIModel';
import { isNotDraggingSelector } from '@src/selectors/dnd';
import TZDate from '@src/time/date';
import { setTimeStrToDate } from '@src/time/datetime';
import { findLastIndex } from '@src/utils/array';
import { isNil, isPresent } from '@src/utils/type';

import { GridPositionFinder, TimeGridData, TimeGridRow } from '@t/grid';

type FilteredUIModelRow = [] | [EventUIModel];

export function ResizingGuideByColumn({
  gridPositionFinder,
  totalUIModels,
  columnIndex,
  timeGridData,
}: {
  gridPositionFinder: GridPositionFinder;
  totalUIModels: EventUIModel[][];
  columnIndex: number;
  timeGridData: TimeGridData;
}) {
  const isNotDragging = useStore(isNotDraggingSelector);
  const { updateEvent } = useDispatch('calendar');
  const { draggingEvent: resizingStartUIModel, clearDraggingEvent } = useDraggingEvent(
    'timeGrid',
    'resize'
  );
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
    const eventStartDateRowIndex = rows.findIndex(
      findRowIndexOf(startTZDate, eventStartDateColumnIndex)
    );
    const eventEndDateColumnIndex = findLastIndex(
      resizeTargetUIModelColumns,
      (row) => row.length > 0
    );
    const endTZDate = (
      resizeTargetUIModelColumns[eventEndDateColumnIndex][0] as EventUIModel
    ).getEnds();
    const eventEndDateRowIndex = rows.findIndex(findRowIndexOf(endTZDate, eventEndDateColumnIndex));

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
    () =>
      baseResizingInfo ? timeGridData.rows[baseResizingInfo.eventStartDateRowIndex].height : 0,
    [baseResizingInfo, timeGridData.rows]
  );

  // Calculate the first column of the dragging event
  useEffect(() => {
    if (canCalculateGuideUIModel && columnIndex === baseResizingInfo.eventStartDateColumnIndex) {
      const { eventStartDateRowIndex, eventStartDateColumnIndex, resizeTargetUIModelColumns } =
        baseResizingInfo;
      const clonedUIModel = (resizeTargetUIModelColumns[columnIndex][0] as EventUIModel).clone();

      let height: number;
      if (eventStartDateColumnIndex === currentGridPos.columnIndex) {
        height = Math.max(
          minimumHeight,
          timeGridData.rows[currentGridPos.rowIndex].top -
            timeGridData.rows[eventStartDateRowIndex].top +
            minimumHeight
        );
      } else if (eventStartDateColumnIndex > currentGridPos.columnIndex) {
        height = minimumHeight;
      } else {
        height = 100 - timeGridData.rows[eventStartDateRowIndex].top;
      }

      clonedUIModel.setUIProps({ height });
      setGuideUIModel(clonedUIModel);
    }
  }, [
    baseResizingInfo,
    canCalculateGuideUIModel,
    columnIndex,
    currentGridPos,
    timeGridData.rows,
    minimumHeight,
  ]);

  // Calculate the column between first and last column of the dragging event
  useEffect(() => {
    if (
      canCalculateGuideUIModel &&
      baseResizingInfo.eventStartDateColumnIndex < columnIndex &&
      columnIndex < currentGridPos.columnIndex
    ) {
      const clonedUIModel = resizingStartUIModel.clone();
      clonedUIModel.setUIProps({
        top: 0,
        left: 0,
        width: 100,
        height: 100,
      });
      setGuideUIModel(clonedUIModel);
    }
  }, [
    baseResizingInfo,
    canCalculateGuideUIModel,
    columnIndex,
    currentGridPos,
    resizingStartUIModel,
  ]);

  // Calculate the last column of the dragging event
  useEffect(() => {
    if (
      canCalculateGuideUIModel &&
      baseResizingInfo.eventStartDateColumnIndex < currentGridPos.columnIndex &&
      columnIndex === currentGridPos.columnIndex
    ) {
      const clonedUIModel = resizingStartUIModel.clone();
      clonedUIModel.setUIProps({
        top: 0,
        left: 0,
        width: 100,
        height: timeGridData.rows[currentGridPos.rowIndex].top + minimumHeight,
      });
      setGuideUIModel(clonedUIModel);
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

  // Reset
  useEffect(() => {
    if (
      canCalculateGuideUIModel &&
      columnIndex > baseResizingInfo.eventStartDateColumnIndex &&
      columnIndex > currentGridPos.columnIndex
    ) {
      setGuideUIModel(null);
    }
  }, [baseResizingInfo, canCalculateGuideUIModel, columnIndex, currentGridPos]);

  const isDraggingEnd =
    isNotDragging &&
    isPresent(baseResizingInfo) &&
    isPresent(currentGridPos) &&
    isPresent(resizingStartUIModel);

  // When dragging ends
  useEffect(() => {
    if (isDraggingEnd) {
      const shouldUpdateEvent =
        columnIndex === currentGridPos.columnIndex &&
        ((baseResizingInfo.eventStartDateColumnIndex === currentGridPos.columnIndex &&
          baseResizingInfo.eventStartDateRowIndex < currentGridPos.rowIndex) ||
          baseResizingInfo.eventStartDateColumnIndex < currentGridPos.columnIndex);

      if (shouldUpdateEvent) {
        const targetEndDate = setTimeStrToDate(
          timeGridData.columns[currentGridPos.columnIndex].date,
          timeGridData.rows[currentGridPos.rowIndex].endTime
        );
        updateEvent({
          event: resizingStartUIModel.model,
          eventData: {
            end: targetEndDate,
          },
        });
      }

      clearStates();
    }
  }, [
    baseResizingInfo,
    clearStates,
    columnIndex,
    currentGridPos,
    isDraggingEnd,
    resizingStartUIModel,
    timeGridData,
    updateEvent,
  ]);

  if (isNil(guideUIModel)) {
    return null;
  }

  return <TimeEvent uiModel={guideUIModel} isResizingGuide={true} />;
}
