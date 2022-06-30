import { useCallback } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';

export function useCalendarById(calendarId: string | null) {
  return useStore(
    useCallback(
      (state) => state.calendar.calendars.find((cal) => cal.id === calendarId),
      [calendarId]
    )
  );
}
