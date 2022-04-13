import type { DeepPartial } from 'ts-essentials';

import { DEFAULT_WEEK_THEME } from '@src/constants/theme';
import { initThemeStore } from '@src/contexts/themeStore';
import { useDayGridRowTitleStyle } from '@src/hooks/dayGridWeek/useDayGridRowTitleStyle';
import { act, renderHook } from '@src/test/utils';

import type { InternalStoreAPI } from '@t/store';
import type { ThemeStore, WeekTheme } from '@t/theme';

describe('useDayGridRowTitleStyle', () => {
  const timesWidth = 120;
  const timezonesCount = 3;
  const width = timesWidth * timezonesCount;
  const { dayGridLeft } = DEFAULT_WEEK_THEME;
  let theme: InternalStoreAPI<ThemeStore>;
  let setWeekThemeDispatcher: (weekTheme: DeepPartial<WeekTheme>) => void;
  const setup = () => {
    const { result } = renderHook(() => useDayGridRowTitleStyle(timesWidth, timezonesCount), {
      theme,
    });

    return result;
  };

  beforeEach(() => {
    theme = initThemeStore();
    setWeekThemeDispatcher = theme.getState().dispatch.setWeekTheme;
  });

  it('should return default style', () => {
    // Given
    const result = setup();

    // When

    // Then
    expect(result.current).toEqual({
      ...dayGridLeft,
      width,
    });
  });

  it('should return style with custom borderRight', () => {
    // Given
    const result = setup();

    // When
    const borderRight = '1px solid red';
    act(() => {
      setWeekThemeDispatcher({
        dayGridLeft: {
          borderRight,
        },
      });
    });

    // Then
    expect(result.current).toEqual({
      ...dayGridLeft,
      width,
      borderRight,
    });
  });

  it('should return style with custom backgroundColor', () => {
    // Given
    const result = setup();

    // When
    const backgroundColor = '#e5e5e5';
    act(() => {
      setWeekThemeDispatcher({
        dayGridLeft: {
          backgroundColor,
        },
      });
    });

    // Then
    expect(result.current).toEqual({
      ...dayGridLeft,
      width,
      backgroundColor,
    });
  });
});
