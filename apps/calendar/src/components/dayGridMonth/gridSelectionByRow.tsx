import { h } from 'preact';
import { useMemo } from 'preact/hooks';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import { useStore } from '@src/contexts/calendarStore';
import { dayGridMonthSelectionHelper } from '@src/helpers/gridSelection';
import TZDate from '@src/time/date';
import { isNil } from '@src/utils/type';

import { CalendarState } from '@t/store';

function dayGridMonthGridSelectionSelector(state: CalendarState) {
  return state.gridSelection.dayGridMonth;
}

interface Props {
  weekDates: TZDate[];
  narrowWeekend: boolean;
  rowIndex: number;
}

export function GridSelectionByRow({ weekDates, narrowWeekend, rowIndex }: Props) {
  const gridSelectionData = useStore(dayGridMonthGridSelectionSelector);

  const gridSelectionDataByRow = useMemo(
    () =>
      dayGridMonthSelectionHelper.calculateSelection(gridSelectionData, rowIndex, weekDates.length),
    [gridSelectionData, rowIndex, weekDates.length]
  );

  if (isNil(gridSelectionDataByRow)) {
    return null;
  }

  return (
    <GridSelection
      gridSelectionData={gridSelectionDataByRow}
      weekDates={weekDates}
      narrowWeekend={narrowWeekend}
    />
  );
}
