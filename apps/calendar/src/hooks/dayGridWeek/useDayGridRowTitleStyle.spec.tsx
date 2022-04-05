import { initThemeStore } from '@src/contexts/themeStore';
import { useDayGridRowTitleStyle } from '@src/hooks/dayGridWeek/useDayGridRowTitleStyle';
import { act, renderHook } from '@src/test/utils';
import { createWeekTheme } from '@src/theme/week';

describe('useDayGridRowTitleStyle', () => {
  const timesWidth = 120;
  const timezonesCount = 3;
  const width = timesWidth * timezonesCount;
  const defaultWeekTheme = createWeekTheme().week;
  const { dayGridLeft } = defaultWeekTheme;
  const theme = initThemeStore();
  const { setWeekTheme } = theme.getState().dispatch;
  const setup = () => {
    const { result } = renderHook(() => useDayGridRowTitleStyle(timesWidth, timezonesCount), {
      theme,
    });

    return result;
  };

  beforeEach(() => {
    act(() => {
      setWeekTheme(defaultWeekTheme);
    });
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
      setWeekTheme({
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
      setWeekTheme({
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
