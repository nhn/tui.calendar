import { useTheme } from '@src/contexts/themeStore';
import { weekThemeSelector } from '@src/selectors/theme';

export function useDayGridRowTitleStyle(timesWidth: number, timezonesCount: number) {
  const { dayGridLeft } = useTheme(weekThemeSelector);
  const columnWidth = timesWidth * timezonesCount;

  return { ...dayGridLeft, width: columnWidth };
}
