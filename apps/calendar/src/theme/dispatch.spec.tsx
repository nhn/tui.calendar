import { h } from 'preact';

import { initThemeStore, useTheme } from '@src/contexts/themeStore';
import { commonThemeSelector, monthThemeSelector, weekThemeSelector } from '@src/selectors/theme';
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
    } = useTheme(commonThemeSelector);

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
    } = useTheme(weekThemeSelector);

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
    } = useTheme(monthThemeSelector);

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
