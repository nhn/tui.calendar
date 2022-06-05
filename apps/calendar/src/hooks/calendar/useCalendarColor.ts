import { useCallback, useMemo } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import type EventUIModel from '@src/model/eventUIModel';

import type { CalendarColor } from '@t/options';

export function useCalendarColor(uiModel: EventUIModel): CalendarColor {
  const calendar = useStore(
    useCallback(
      (state) => state.calendar.calendars.find((cal) => cal.id === uiModel.model.calendarId),
      [uiModel.model.calendarId]
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
