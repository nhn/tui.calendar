import { h } from 'preact';

import {
  initThemeStore,
  useAllTheme,
  useCommonTheme,
  useMonthTheme,
  useWeekTheme,
} from '@src/contexts/themeStore';
import { act, render, screen } from '@src/test/utils';

describe('setCommonTheme', () => {
  const theme = initThemeStore();
  const { setCommonTheme } = theme.getState().dispatch;
  let beforeBackgroundColor: string;
  let beforeGridSelectionBorder: string;

  function CommonThemeComponent() {
    const {
      backgroundColor,
      gridSelection: { border },
    } = useCommonTheme();

    return (
      <div>
        <div style={{ backgroundColor, border }}>common theme</div>
      </div>
    );
  }

  beforeEach(() => {
    beforeBackgroundColor = theme.getState().common.backgroundColor ?? '';
    beforeGridSelectionBorder = theme.getState().common.gridSelection.border ?? '';
    render(<CommonThemeComponent />, { theme });
  });

  it('should set theme and other properties should not be changed', () => {
    // Given
    const backgroundColor = 'black';

    // When
    act(() => {
      setCommonTheme({
        backgroundColor,
      });
    });

    // Then
    expect(theme.getState().common.backgroundColor).toBe(backgroundColor);
    expect(theme.getState().common.gridSelection.border).toBe(beforeGridSelectionBorder);
  });

  it('should rerender component that use useTheme when theme is changed', () => {
    // Given
    const backgroundColor = 'black';

    // When
    act(() => {
      setCommonTheme({
        backgroundColor,
      });
    });

    // Then
    expect(screen.getByText('common theme')).toHaveStyle({
      backgroundColor,
      border: beforeGridSelectionBorder,
    });
  });

  it('should not change theme when unused theme is changed', () => {
    // Given
    const color = 'black';

    // When
    act(() => {
      setCommonTheme({
        today: {
          color,
        },
      });
    });

    // Then
    expect(screen.getByText('common theme')).toHaveStyle({
      backgroundColor: beforeBackgroundColor,
      border: beforeGridSelectionBorder,
    });
  });
});

describe('setWeekTheme', () => {
  const theme = initThemeStore();
  const { setWeekTheme } = theme.getState().dispatch;
  let beforePastTimeColor: string;
  let beforeNowIndicatorLabelColor: string;

  function WeekThemeComponent() {
    const {
      pastTime: { color: pastTimeColor },
      nowIndicatorLabel: { color: nowIndicatorLabelColor },
    } = useWeekTheme();

    return (
      <div>
        <div style={{ backgroundColor: pastTimeColor, color: nowIndicatorLabelColor }}>
          week theme
        </div>
      </div>
    );
  }

  beforeEach(() => {
    beforePastTimeColor = theme.getState().week.pastTime.color ?? '';
    beforeNowIndicatorLabelColor = theme.getState().week.nowIndicatorLabel.color ?? '';
    render(<WeekThemeComponent />, { theme });
  });

  it('should set theme and other properties should not be changed', () => {
    // Given
    const color = 'black';

    // When
    act(() => {
      setWeekTheme({
        pastTime: {
          color,
        },
      });
    });

    // Then
    expect(theme.getState().week.pastTime.color).toBe(color);
    expect(theme.getState().week.nowIndicatorLabel.color).toBe(beforeNowIndicatorLabelColor);
  });

  it('should rerender component that use useTheme when theme is changed', () => {
    // Given
    const color = 'black';

    // When
    act(() => {
      setWeekTheme({
        pastTime: {
          color,
        },
      });
    });

    // Then
    expect(screen.getByText('week theme')).toHaveStyle({
      backgroundColor: color,
      color: beforeNowIndicatorLabelColor,
    });
  });

  it('should not change theme when unused theme is changed', () => {
    // Given
    const color = 'black';

    // When
    act(() => {
      setWeekTheme({
        today: {
          color,
        },
      });
    });

    // Then
    expect(screen.getByText('week theme')).toHaveStyle({
      backgroundColor: beforePastTimeColor,
      color: beforeNowIndicatorLabelColor,
    });
  });
});

describe('setMonthTheme', () => {
  const theme = initThemeStore();
  const { setMonthTheme } = theme.getState().dispatch;
  let beforeDayExceptThisMonthColor: string;
  let beforeHolidayExceptThisMonthColor: string;

  function MonthThemeComponent() {
    const {
      dayExceptThisMonth: { color: dayExceptThisMonthColor },
      holidayExceptThisMonth: { color: holidayExceptThisMonthColor },
    } = useMonthTheme();

    return (
      <div>
        <div
          style={{ backgroundColor: dayExceptThisMonthColor, color: holidayExceptThisMonthColor }}
        >
          month theme
        </div>
      </div>
    );
  }

  beforeEach(() => {
    beforeDayExceptThisMonthColor = theme.getState().month.dayExceptThisMonth.color ?? '';
    beforeHolidayExceptThisMonthColor = theme.getState().month.holidayExceptThisMonth.color ?? '';
    render(<MonthThemeComponent />, { theme });
  });

  it('should set theme and other properties should not be changed', () => {
    // Given
    const color = 'black';

    // When
    act(() => {
      setMonthTheme({
        dayExceptThisMonth: {
          color,
        },
      });
    });

    // Then
    expect(theme.getState().month.dayExceptThisMonth.color).toBe(color);
    expect(theme.getState().month.holidayExceptThisMonth.color).toBe(
      beforeHolidayExceptThisMonthColor
    );
  });

  it('should rerender component that use useTheme when theme is changed', () => {
    // Given
    const color = 'black';

    // When
    act(() => {
      setMonthTheme({
        dayExceptThisMonth: {
          color,
        },
      });
    });

    // Then
    expect(screen.getByText('month theme')).toHaveStyle({
      backgroundColor: color,
      color: beforeHolidayExceptThisMonthColor,
    });
  });

  it('should not change theme when unused theme is changed', () => {
    // Given
    const backgroundColor = 'black';

    // When
    act(() => {
      setMonthTheme({
        weekend: {
          backgroundColor,
        },
      });
    });

    // Then
    expect(screen.getByText('month theme')).toHaveStyle({
      backgroundColor: beforeDayExceptThisMonthColor,
      color: beforeHolidayExceptThisMonthColor,
    });
  });
});

describe('setTheme', () => {
  const theme = initThemeStore();
  const { setTheme } = theme.getState().dispatch;
  let beforeCommonBorder: string;
  let beforeWeekTodayColor: string;
  let beforeMonthDayExceptThisMonthColor: string;

  function ThemeComponent() {
    const { common, week, month } = useAllTheme();
    const commonBorder = common.border ?? '';
    const weekTodayColor = week.today.color ?? '';
    const monthDayExceptThisMonthColor = month.dayExceptThisMonth.color ?? '';

    return (
      <div>
        <div
          style={{
            border: commonBorder,
            backgroundColor: weekTodayColor,
            color: monthDayExceptThisMonthColor,
          }}
        >
          all theme
        </div>
      </div>
    );
  }

  beforeEach(() => {
    beforeCommonBorder = theme.getState().common.border ?? '';
    beforeWeekTodayColor = theme.getState().week.today.color ?? '';
    beforeMonthDayExceptThisMonthColor = theme.getState().month.dayExceptThisMonth.color ?? '';
    render(<ThemeComponent />, { theme });
  });

  it('should set theme and other properties should not be changed', () => {
    // Given
    const color = 'black';

    // When
    act(() => {
      setTheme({
        week: {
          today: {
            color,
          },
        },
      });
    });

    // Then
    expect(theme.getState().common.border).toBe(beforeCommonBorder);
    expect(theme.getState().week.today.color).toBe(color);
    expect(theme.getState().month.dayExceptThisMonth.color).toBe(
      beforeMonthDayExceptThisMonthColor
    );
  });

  it('should rerender component that use useTheme when theme is changed', () => {
    // Given
    const color = 'black';

    // When
    act(() => {
      setTheme({
        week: {
          today: {
            color,
          },
        },
      });
    });

    // Then
    expect(screen.getByText('all theme')).toHaveStyle({
      border: beforeCommonBorder,
      backgroundColor: color,
      color: beforeMonthDayExceptThisMonthColor,
    });
  });

  it('should not change theme when unused theme is changed', () => {
    // Given
    const backgroundColor = 'black';

    // When
    act(() => {
      setTheme({
        month: {
          weekend: {
            backgroundColor,
          },
        },
      });
    });

    // Then
    expect(screen.getByText('all theme')).toHaveStyle({
      border: beforeCommonBorder,
      backgroundColor: beforeWeekTodayColor,
      color: beforeMonthDayExceptThisMonthColor,
    });
  });
});
