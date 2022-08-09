import { h } from 'preact';
import { useCallback, useMemo } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';
import { timeGridSelectionHelper } from '@src/helpers/gridSelection';
import { isNil } from '@src/utils/type';

import type { TimeGridRow } from '@t/grid';
import type { CalendarState } from '@t/store';

function GridSelection({ top, height, text }: { top: number; height: number; text: string }) {
  const { backgroundColor, border } = useTheme(
    useCallback((theme) => theme.common.gridSelection, [])
  );
  const color = useTheme(useCallback((theme) => theme.week.gridSelection.color, []));

  const style = {
    top: toPercent(top),
    height: toPercent(height),
    backgroundColor,
    border,
  };

  return (
    <div
      className={cls('time', 'grid-selection')}
      style={style}
      data-testid={`time-grid-selection-${top}-${height}`}
    >
      {text.length > 0 ? (
        <span className={cls('grid-selection-label')} style={{ color }}>
          {text}
        </span>
      ) : null}
    </div>
  );
}

interface Props {
  columnIndex: number;
  timeGridRows: TimeGridRow[];
}

export function GridSelectionByColumn({ columnIndex, timeGridRows }: Props) {
  const gridSelectionData = useStore(
    useCallback(
      (state: CalendarState) =>
        timeGridSelectionHelper.calculateSelection(
          state.gridSelection.timeGrid,
          columnIndex,
          timeGridRows.length - 1
        ),
      [columnIndex, timeGridRows]
    )
  );

  const gridSelectionProps = useMemo(() => {
    if (!gridSelectionData) {
      return null;
    }

    const { startRowIndex, endRowIndex, isStartingColumn, isSelectingMultipleColumns } =
      gridSelectionData;

    const { top: startRowTop, startTime: startRowStartTime } = timeGridRows[startRowIndex];
    const {
      top: endRowTop,
      height: endRowHeight,
      endTime: endRowEndTime,
    } = timeGridRows[endRowIndex];

    const gridSelectionHeight = endRowTop + endRowHeight - startRowTop;

    let text = `${startRowStartTime} - ${endRowEndTime}`;
    if (isSelectingMultipleColumns) {
      text = isStartingColumn ? startRowStartTime : '';
    }

    return {
      top: startRowTop,
      height: gridSelectionHeight,
      text,
    };
  }, [gridSelectionData, timeGridRows]);

  if (isNil(gridSelectionProps)) {
    return null;
  }

  return <GridSelection {...gridSelectionProps} />;
}
