import { useDayGridRowTitleTheme } from '@src/hooks/dayGridWeek/dayGridRowTitleTheme';
import { renderHook } from '@src/test/utils';
import Theme from '@src/theme';

describe('useDayGridRowTitleTheme', () => {
  let theme: Theme;
  const timesWidth = 120;
  const timezonesCount = 3;
  const setup = (newTheme: Theme) => {
    const { result } = renderHook(() => useDayGridRowTitleTheme(timesWidth, timezonesCount), {
      theme: newTheme,
    });

    return result;
  };

  beforeEach(() => {
    theme = new Theme();
  });

  it('should return default style', () => {
    // Given
    const result = setup(theme);

    // When

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
    const result = setup(theme);

    // When

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
    const result = setup(theme);

    // When

    // Then
    expect(result.current).toEqual({
      ...theme.week.dayGridLeft,
      width: timesWidth * timezonesCount,
      backgroundColor,
    });
  });
});
