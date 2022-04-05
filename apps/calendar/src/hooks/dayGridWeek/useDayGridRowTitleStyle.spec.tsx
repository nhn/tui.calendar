import { initThemeStore } from '@src/contexts/themeStore';
import { useDayGridRowTitleStyle } from '@src/hooks/dayGridWeek/useDayGridRowTitleStyle';
import { renderHook } from '@src/test/utils';
import { createWeekTheme } from '@src/theme/week';

import { InternalStoreAPI } from '@t/store';

describe('useDayGridRowTitleStyle', () => {
  let theme: InternalStoreAPI<ThemeStore>;
  const timesWidth = 120;
  const timezonesCount = 3;
  const { dayGridLeft } = createWeekTheme().week;
  const setup = (newTheme: typeof theme) => {
    const { result } = renderHook(() => useDayGridRowTitleStyle(timesWidth, timezonesCount), {
      theme: newTheme,
    });

    return result;
  };

  beforeEach(() => {
    theme = initThemeStore();
  });

  it('should return default style', () => {
    // Given

    // When
    const result = setup(theme);

    // Then
    expect(result.current).toEqual({
      ...dayGridLeft,
      width: timesWidth * timezonesCount,
    });
  });

  it('should return style with custom borderRight', () => {
    // Given
    const borderRight = '1px solid red';
    // theme.setStyle('week.dayGridLeft.borderRight', borderRight);

    // When
    const result = setup(theme);

    // Then
    expect(result.current).toEqual({
      ...dayGridLeft,
      width: timesWidth * timezonesCount,
      borderRight,
    });
  });

  it('should return style with custom backgroundColor', () => {
    // Given
    const backgroundColor = '#e5e5e5';
    // theme.setStyle('week.dayGridLeft.backgroundColor', backgroundColor);

    // When
    const result = setup(theme);

    // Then
    expect(result.current).toEqual({
      ...dayGridLeft,
      width: timesWidth * timezonesCount,
      backgroundColor,
    });
  });
});
