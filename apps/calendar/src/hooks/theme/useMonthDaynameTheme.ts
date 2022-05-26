import { useCallback } from 'preact/hooks';

import { useTheme } from '@src/contexts/themeStore';

export function useMonthDaynameTheme() {
  return useTheme(
    useCallback(
      (themeState) => ({
        common: {
          saturday: themeState.common.saturday,
          holiday: themeState.common.holiday,
          today: themeState.common.today,
          dayname: themeState.common.dayname,
        },
        month: {
          dayname: themeState.month.dayname,
        },
      }),
      []
    )
  );
}
