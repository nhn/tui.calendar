import { useCallback } from 'preact/hooks';

import { useTheme } from '@src/contexts/themeStore';

export function useDayGridRowTitleStyle(timesWidth: number, timezonesCount: number) {
  const dayGridLeft = useTheme(useCallback((theme) => theme.week.dayGridLeft, []));
  const columnWidth = timesWidth * timezonesCount;

  return { ...dayGridLeft, width: columnWidth };
}
