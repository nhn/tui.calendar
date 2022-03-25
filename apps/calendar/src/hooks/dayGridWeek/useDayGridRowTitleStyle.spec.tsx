import { useDayGridRowTitleStyle } from '@src/hooks/dayGridWeek/useDayGridRowTitleStyle';
import { renderHook } from '@src/test/utils';
import Theme from '@src/theme';

describe('useDayGridRowTitleStyle', () => {
  let theme: Theme;
  const timesWidth = 120;
  const timezonesCount = 3;
  const setup = (newTheme: Theme) => {
    const { result } = renderHook(() => useDayGridRowTitleStyle(timesWidth, timezonesCount), {
      theme: newTheme,
    });

    return result;
  };

  beforeEach(() => {
    theme = new Theme();
  });

  it('should return default style', () => {
    // Given

    // When
    const result = setup(theme);

    // Then
    expect(result.current).toEqual({
      ...theme.week.dayGridLeft,
      width: timesWidth * timezonesCount,
    });
  });

  it('should return style with custom borderRight', () => {
    // Given
    const borderRight = '1px solid red';
    theme.setStyle('week.dayGridLeft.borderRight', borderRight);

    // When
    const result = setup(theme);

    // Then
    expect(result.current).toEqual({
      ...theme.week.dayGridLeft,
      width: timesWidth * timezonesCount,
      borderRight,
    });
  });

  it('should return style with custom backgroundColor', () => {
    // Given
    const backgroundColor = '#e5e5e5';
    theme.setStyle('week.dayGridLeft.backgroundColor', backgroundColor);

    // When
    const result = setup(theme);

    // Then
    expect(result.current).toEqual({
      ...theme.week.dayGridLeft,
      width: timesWidth * timezonesCount,
      backgroundColor,
    });
  });
});
