import { h } from 'preact';
import { useCallback } from 'preact/hooks';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import { useStore } from '@src/contexts/calendarStore';
import { dayGridMonthSelectionHelper } from '@src/helpers/gridSelection';
import type TZDate from '@src/time/date';
import { isNil } from '@src/utils/type';

import type { CalendarState } from '@t/store';

interface Props {
  weekDates: TZDate[];
  narrowWeekend: boolean;
  rowIndex: number;
}

export function GridSelectionByRow({ weekDates, narrowWeekend, rowIndex }: Props) {
  const gridSelectionDataByRow = useStore(
    useCallback(
      (state: CalendarState) =>
        dayGridMonthSelectionHelper.calculateSelection(
          state.gridSelection.dayGridMonth,
          rowIndex,
          weekDates.length
        ),
      [rowIndex, weekDates.length]
    )
  );

  if (isNil(gridSelectionDataByRow)) {
    return null;
  }

  return (
    <GridSelection
      type="month"
      gridSelectionData={gridSelectionDataByRow}
      weekDates={weekDates}
      narrowWeekend={narrowWeekend}
    />
  );
}
