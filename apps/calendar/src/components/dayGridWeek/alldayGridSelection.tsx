import type { ComponentProps } from 'preact';
import { h } from 'preact';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import type { AlldayGridRow } from '@src/components/dayGridWeek/alldayGridRow';
import { useStore } from '@src/contexts/calendarStore';
import { alldayGridRowSelectionHelper } from '@src/helpers/gridSelection';
import { isNil } from '@src/utils/type';

import type { CalendarState } from '@t/store';

function dayGridWeekSelectionSelector(state: CalendarState) {
  return alldayGridRowSelectionHelper.calculateSelection(state.gridSelection.dayGridWeek);
}

type Props = Pick<ComponentProps<typeof AlldayGridRow>, 'weekDates'> & {
  narrowWeekend: boolean;
};

export function AlldayGridSelection({ weekDates, narrowWeekend }: Props) {
  const calculatedGridSelection = useStore(dayGridWeekSelectionSelector);

  if (isNil(calculatedGridSelection)) {
    return null;
  }

  return (
    <GridSelection
      type="allday"
      gridSelectionData={calculatedGridSelection}
      weekDates={weekDates}
      narrowWeekend={narrowWeekend}
    />
  );
}
