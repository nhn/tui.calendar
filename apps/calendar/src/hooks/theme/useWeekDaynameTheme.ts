import { useCallback } from 'preact/hooks';

import { useTheme } from '@src/contexts/themeStore';

export function useWeekDaynameTheme() {
  return useTheme(
    useCallback(
      (themeState) => ({
        common: {
          saturday: themeState.common.saturday,
          holiday: themeState.common.holiday,
          today: themeState.common.today,
          dayname: themeState.common.dayname,
        },
        week: {
          pastDay: themeState.week.pastDay,
          today: themeState.week.today,
          dayname: themeState.week.dayname,
        },
      }),
      []
    )
  );
}
