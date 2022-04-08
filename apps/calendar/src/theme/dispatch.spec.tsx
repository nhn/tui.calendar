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
        <div>backgroundColor: {backgroundColor}</div>
        <div>border: {border}</div>
      </div>
    );
  }

  beforeEach(() => {
    beforeBackgroundColor = theme.getState().common?.backgroundColor ?? '';
    beforeGridSelectionBorder = theme.getState().common?.gridSelection.border ?? '';
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
    expect(theme.getState().common?.backgroundColor).toBe(backgroundColor);
    expect(theme.getState().common?.gridSelection.border).toBe(beforeGridSelectionBorder);
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
    expect(screen.getByText(`backgroundColor: ${backgroundColor}`)).toBeInTheDocument();
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
    expect(screen.getByText(`backgroundColor: ${beforeBackgroundColor}`)).toBeInTheDocument();
    expect(screen.getByText(`border: ${beforeGridSelectionBorder}`)).toBeInTheDocument();
  });
});

describe('setWeekTheme', () => {
  const theme = initThemeStore();
  const { setWeekTheme } = theme.getState().dispatch;
  let beforePastTimeColor: string;
  let beforeCurrentTimeColor: string;

  function WeekThemeComponent() {
    const {
      pastTime: { color: pastTimeColor },
      currentTime: { color: currentTimeColor },
    } = useWeekTheme();

    return (
      <div>
        <div>pastTimeColor: {pastTimeColor}</div>
        <div>currentTimeColor: {currentTimeColor}</div>
      </div>
    );
  }

  beforeEach(() => {
    beforePastTimeColor = theme.getState().week?.pastTime.color ?? '';
    beforeCurrentTimeColor = theme.getState().week?.currentTime.color ?? '';
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
    expect(theme.getState().week?.pastTime.color).toBe(color);
    expect(theme.getState().week?.currentTime.color).toBe(beforeCurrentTimeColor);
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
    expect(screen.getByText(`pastTimeColor: ${color}`)).toBeInTheDocument();
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
    expect(screen.getByText(`pastTimeColor: ${beforePastTimeColor}`)).toBeInTheDocument();
    expect(screen.getByText(`currentTimeColor: ${beforeCurrentTimeColor}`)).toBeInTheDocument();
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
        <div>dayExceptThisMonthColor: {dayExceptThisMonthColor}</div>
        <div>holidayExceptThisMonthColor: {holidayExceptThisMonthColor}</div>
      </div>
    );
  }

  beforeEach(() => {
    beforeDayExceptThisMonthColor = theme.getState().month?.dayExceptThisMonth.color ?? '';
    beforeHolidayExceptThisMonthColor = theme.getState().month?.holidayExceptThisMonth.color ?? '';
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
    expect(theme.getState().month?.dayExceptThisMonth.color).toBe(color);
    expect(theme.getState().month?.holidayExceptThisMonth.color).toBe(
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
    expect(screen.getByText(`dayExceptThisMonthColor: ${color}`)).toBeInTheDocument();
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
    expect(
      screen.getByText(`dayExceptThisMonthColor: ${beforeDayExceptThisMonthColor}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`holidayExceptThisMonthColor: ${beforeHolidayExceptThisMonthColor}`)
    ).toBeInTheDocument();
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
    const commonBorder = common?.border ?? '';
    const weekTodayColor = week?.today.color ?? '';
    const monthDayExceptThisMonthColor = month?.dayExceptThisMonth.color ?? '';

    return (
      <div>
        <div>commonBorder: {commonBorder}</div>
        <div>weekTodayColor: {weekTodayColor}</div>
        <div>monthDayExceptThisMonthColor: {monthDayExceptThisMonthColor}</div>
      </div>
    );
  }

  beforeEach(() => {
    beforeCommonBorder = theme.getState().common?.border ?? '';
    beforeWeekTodayColor = theme.getState().week?.today.color ?? '';
    beforeMonthDayExceptThisMonthColor = theme.getState().month?.dayExceptThisMonth.color ?? '';
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
    expect(theme.getState().common?.border).toBe(beforeCommonBorder);
    expect(theme.getState().week?.today.color).toBe(color);
    expect(theme.getState().month?.dayExceptThisMonth.color).toBe(
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
    expect(screen.getByText(`weekTodayColor: ${color}`)).toBeInTheDocument();
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
    expect(screen.getByText(`commonBorder: ${beforeCommonBorder}`)).toBeInTheDocument();
    expect(screen.getByText(`weekTodayColor: ${beforeWeekTodayColor}`)).toBeInTheDocument();
    expect(
      screen.getByText(`monthDayExceptThisMonthColor: ${beforeMonthDayExceptThisMonthColor}`)
    ).toBeInTheDocument();
  });
});
