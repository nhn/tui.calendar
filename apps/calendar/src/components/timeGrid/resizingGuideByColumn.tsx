import { h } from 'preact';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';

import { TimeEvent } from '@src/components/events/timeEvent';
import { useStore } from '@src/contexts/calendarStore';
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

  useEffect(() => {
    // Calculate the first column of the dragging event
    if (canCalculateGuideUIModel && columnIndex === baseResizingInfo.eventStartDateColumnIndex) {
      const { eventStartDateRowIndex, resizeTargetUIModelColumns } = baseResizingInfo;
      const clonedUIModel = (resizeTargetUIModelColumns[columnIndex][0] as EventUIModel).clone();

      const height = Math.max(
        timeGridData.rows[eventStartDateRowIndex].height,
        timeGridData.rows[currentGridPos.rowIndex].top -
          timeGridData.rows[eventStartDateRowIndex].top
      );
      clonedUIModel.setUIProps({ height });
      setGuideUIModel(clonedUIModel);
    }
  }, [baseResizingInfo, canCalculateGuideUIModel, columnIndex, currentGridPos, timeGridData.rows]);

  useEffect(() => {
    // Calculate the column between first and last column of the dragging event
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

  // WHen dragging ends
  useEffect(() => {
    if (isNotDragging && isPresent(guideUIModel)) {
      clearStates();
    }
  }, [clearStates, guideUIModel, isNotDragging]);

  if (isNil(guideUIModel)) {
    return null;
  }

  return <TimeEvent uiModel={guideUIModel} isResizingGuide={true} />;
}
