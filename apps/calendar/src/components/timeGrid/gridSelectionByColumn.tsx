import { h } from 'preact';
import { useMemo } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { cls, toPercent } from '@src/helpers/css';
import { timeGridSelectionHelper } from '@src/helpers/gridSelection';
import { isNil } from '@src/utils/type';

import { TimeGridRow } from '@t/grid';
import { CalendarState } from '@t/store';

function GridSelection({ top, height, text }: { top: number; height: number; text: string }) {
  const style = {
    top: toPercent(top),
    height: toPercent(height),
  };

  return (
    <div
      className={cls('grid-selection')}
      style={style}
      data-testid={`time-grid-selection-${top}-${height}`}
    >
      {text.length > 0 ? <span className={cls('grid-selection-label')}>{text}</span> : null}
    </div>
  );
}

function timeGridSelectionSelector(state: CalendarState) {
  return state.gridSelection.timeGrid;
}

interface Props {
  columnIndex: number;
  timeGridRows: TimeGridRow[];
}

export function GridSelectionByColumn({ columnIndex, timeGridRows }: Props) {
  const timeGridSelection = useStore(timeGridSelectionSelector);

  const gridSelectionData = useMemo(
    () => timeGridSelectionHelper.calculateSelection(timeGridSelection, columnIndex),
    [columnIndex, timeGridSelection]
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
