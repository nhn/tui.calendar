import { useLayoutEffect, useState } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { isPresent } from '@src/utils/type';

import type { CalendarState } from '@t/store';

function timegridHeightSelector(state: CalendarState) {
  // TODO: change `dayGridRows` to `panels`
  return state.weekViewLayout?.dayGridRows?.time?.height;
}

export function useTimezoneLabelsTop(timePanel: HTMLDivElement | null): number | null {
  const timeGridPanelHeight = useStore(timegridHeightSelector);
  const [stickyTop, setStickyTop] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (isPresent(timeGridPanelHeight) && timePanel) {
      setStickyTop(timePanel.offsetTop);
    }
  }, [timeGridPanelHeight, timePanel]);

  return stickyTop;
}
