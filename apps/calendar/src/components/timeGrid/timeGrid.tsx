import { h } from 'preact';
import { useCallback, useLayoutEffect, useMemo, useState } from 'preact/hooks';

import { addTimeGridPrefix, className as timegridClassName } from '@src/components/timeGrid';
import { Column } from '@src/components/timeGrid/column';
import { GridLines } from '@src/components/timeGrid/gridLines';
import { MovingEventShadow } from '@src/components/timeGrid/movingEventShadow';
import { NowIndicator } from '@src/components/timeGrid/nowIndicator';
import { TimeColumn } from '@src/components/timeGrid/timeColumn';
import { useStore } from '@src/contexts/calendarStore';
import { useTheme } from '@src/contexts/themeStore';
import { isBetween, setRenderInfoOfUIModels } from '@src/controller/column';
import { getTopPercentByTime } from '@src/controller/times';
import { cls, toPercent } from '@src/helpers/css';
import { createGridPositionFinder } from '@src/helpers/grid';
import { timeGridSelectionHelper } from '@src/helpers/gridSelection';
import { useDOMNode } from '@src/hooks/common/useDOMNode';
import { useInterval } from '@src/hooks/common/useInterval';
import { useIsMounted } from '@src/hooks/common/useIsMounted';
import { useGridSelection } from '@src/hooks/gridSelection/useGridSelection';
import { usePrimaryTimezone } from '@src/hooks/timezone/usePrimaryTimezone';
import type EventUIModel from '@src/model/eventUIModel';
import { optionsSelector } from '@src/selectors';
import { weekTimeGridLeftSelector } from '@src/selectors/theme';
import type TZDate from '@src/time/date';
import {
  isSameDate,
  MS_PER_MINUTES,
  setTimeStrToDate,
  toEndOfDay,
  toStartOfDay,
} from '@src/time/datetime';
import { first, last } from '@src/utils/array';
import { passConditionalProp } from '@src/utils/preact';
import { isPresent } from '@src/utils/type';

import type { TimeGridData } from '@t/grid';

const classNames = {
  timegrid: cls(timegridClassName),
  scrollArea: cls(addTimeGridPrefix('scroll-area')),
};

interface Props {
  events: EventUIModel[];
  timeGridData: TimeGridData;
}

export function TimeGrid({ timeGridData, events }: Props) {
  const { isReadOnly } = useStore(optionsSelector);
  const [, getNow] = usePrimaryTimezone();

  const isMounted = useIsMounted();
  const { width: timeGridLeftWidth } = useTheme(weekTimeGridLeftSelector);

  const [nowIndicatorState, setNowIndicatorState] = useState<{
    top: number;
    now: TZDate;
  } | null>(null);

  const { columns, rows } = timeGridData;
  const lastColumnIndex = columns.length - 1;

  const totalUIModels = useMemo(
    () =>
      columns
        .map(({ date }) =>
          events
            .filter(isBetween(toStartOfDay(date), toEndOfDay(date)))
            // NOTE: prevent shared reference between columns
            .map((uiModel) => uiModel.clone())
        )
        .map((uiModelsByColumn, columnIndex) =>
          setRenderInfoOfUIModels(
            uiModelsByColumn,
            setTimeStrToDate(columns[columnIndex].date, first(rows).startTime),
            setTimeStrToDate(columns[columnIndex].date, last(rows).endTime)
          )
        ),
    [columns, rows, events]
  );

  const currentDateData = useMemo(() => {
    const now = getNow();
    const currentDateIndexInColumns = columns.findIndex((column) => isSameDate(column.date, now));
    if (currentDateIndexInColumns < 0) {
      return null;
    }
    const startTime = setTimeStrToDate(
      columns[currentDateIndexInColumns].date,
      timeGridData.rows[0].startTime
    );
    const endTime = setTimeStrToDate(
      columns[currentDateIndexInColumns].date,
      last(timeGridData.rows).endTime
    );

    return {
      startTime,
      endTime,
      currentDateIndex: currentDateIndexInColumns,
    };
  }, [columns, getNow, timeGridData.rows]);

  const [columnsContainer, setColumnsContainer] = useDOMNode();
  const gridPositionFinder = useMemo(
    () =>
      createGridPositionFinder({
        rowsCount: rows.length,
        columnsCount: columns.length,
        container: columnsContainer,
      }),
    [columns.length, columnsContainer, rows.length]
  );

  const onMouseDown = useGridSelection({
    type: 'timeGrid',
    gridPositionFinder,
    selectionSorter: timeGridSelectionHelper.sortSelection,
    dateGetter: timeGridSelectionHelper.getDateFromCollection,
    dateCollection: timeGridData,
  });

  const updateTimeGridIndicator = useCallback(() => {
    if (isPresent(currentDateData)) {
      const { startTime, endTime } = currentDateData;
      const now = getNow();

      if (startTime <= now && now <= endTime) {
        setNowIndicatorState({
          top: getTopPercentByTime(now, startTime, endTime),
          now,
        });
      }
    }
  }, [currentDateData, getNow]);

  // Calculate initial setTimeIndicatorTop
  useLayoutEffect(() => {
    if (isMounted()) {
      if ((currentDateData?.currentDateIndex ?? -1) >= 0) {
        updateTimeGridIndicator();
      } else {
        setNowIndicatorState(null);
      }
    }
  }, [currentDateData, isMounted, updateTimeGridIndicator]);

  // Set interval to update timeIndicatorTop
  useInterval(updateTimeGridIndicator, isPresent(currentDateData) ? MS_PER_MINUTES : null);

  return (
    <div className={classNames.timegrid}>
      <div className={classNames.scrollArea}>
        <TimeColumn timeGridRows={rows} nowIndicatorState={nowIndicatorState} />
        <div
          className={cls('columns')}
          style={{ left: timeGridLeftWidth }}
          ref={setColumnsContainer}
          onMouseDown={passConditionalProp(!isReadOnly, onMouseDown)}
        >
          <GridLines timeGridRows={rows} />
          <MovingEventShadow gridPositionFinder={gridPositionFinder} timeGridData={timeGridData} />
          {columns.map((column, index) => (
            <Column
              key={column.date.toString()}
              timeGridData={timeGridData}
              columnDate={column.date}
              columnWidth={toPercent(column.width)}
              columnIndex={index}
              totalUIModels={totalUIModels}
              gridPositionFinder={gridPositionFinder}
              isLastColumn={index === lastColumnIndex}
            />
          ))}
          {isPresent(currentDateData) && isPresent(nowIndicatorState) ? (
            <NowIndicator
              top={nowIndicatorState.top}
              columnWidth={columns[0].width}
              columnCount={columns.length}
              columnIndex={currentDateData.currentDateIndex}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
