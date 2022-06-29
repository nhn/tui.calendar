import { useCallback, useMemo } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import type EventModel from '@src/model/eventModel';

import type { CalendarColor } from '@t/options';

export function useCalendarColor(model?: EventModel): CalendarColor {
  const calendar = useStore(
    useCallback(
      (state) => state.calendar.calendars.find((cal) => cal.id === model?.calendarId),
      [model?.calendarId]
    )
  );

  return useMemo(
    () => ({
      color: calendar?.color,
      borderColor: calendar?.borderColor,
      backgroundColor: calendar?.backgroundColor,
      dragBackgroundColor: calendar?.dragBackgroundColor,
    }),
    [calendar]
  );
}
