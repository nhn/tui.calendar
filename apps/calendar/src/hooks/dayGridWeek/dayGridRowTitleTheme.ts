import { useTheme } from '@src/contexts/theme';

export function useDayGridRowTitleTheme(timesWidth: number, timezonesCount: number) {
  const {
    week: { dayGridLeft },
  } = useTheme();
  const columnWidth = timesWidth * timezonesCount;

  return { ...dayGridLeft, width: columnWidth };
}
