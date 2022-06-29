import { useMemo } from 'preact/hooks';

import { useCalendarById } from '@src/hooks/calendar/useCalendarById';
import type EventModel from '@src/model/eventModel';

import type { CalendarColor } from '@t/options';

export function useCalendarColor(model?: EventModel): CalendarColor {
  const calendar = useCalendarById(model?.calendarId ?? null);

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
