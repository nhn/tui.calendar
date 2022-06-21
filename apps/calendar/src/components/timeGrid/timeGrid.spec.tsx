import { h } from 'preact';

import { TimeGrid } from '@src/components/timeGrid/timeGrid';
import { toPercent } from '@src/helpers/css';
import { createTimeGridData, getWeekDates } from '@src/helpers/grid';
import { createDate } from '@src/test/helpers';
import { TEST_IDS } from '@src/test/testIds';
import { act, cleanup, render, screen, within } from '@src/test/utils';
import { MS_PER_HOUR, subtractDate } from '@src/time/datetime';

describe('Showing Current Time Indicator', () => {
  const originalTimezone = process.env.TZ;
  const baseDate = createDate(2022, 3, 22); // Tuesday
  baseDate.setHours(12); // 12:00
  const timeColumnTestId = 'timegrid-time-column';

  beforeEach(() => {
    process.env.TZ = 'UTC';
    jest.useFakeTimers().setSystemTime(baseDate.getTime());
  });

  afterEach(() => {
    cleanup();
    jest.useRealTimers();
    process.env.TZ = originalTimezone;
  });

  it('should render indicator component when rendering TimeGrid including current date', () => {
    // Given
    const weekDatesIncludingBaseDate = getWeekDates(baseDate, {
      startDayOfWeek: 0,
      workweek: false,
    });
    const timeGridData = createTimeGridData(weekDatesIncludingBaseDate, {
      hourStart: 0,
      hourEnd: 24,
    });

    // When
    render(<TimeGrid timeGridData={timeGridData} events={[]} />);

    // Then
    const indicator = screen.getByTestId(TEST_IDS.NOW_INDICATOR);
    expect(indicator).toBeInTheDocument();
  });

  it('should not render indicator component when rendering TimeGrid not including current date', () => {
    // Given
    const weekDatesBeforeBaseDate = getWeekDates(subtractDate(baseDate, 7), {
      startDayOfWeek: 0,
      workweek: false,
    });
    const timeGridData = createTimeGridData(weekDatesBeforeBaseDate, { hourStart: 0, hourEnd: 24 });

    // When
    render(<TimeGrid timeGridData={timeGridData} events={[]} />);

    // Then
    const indicator = screen.queryByTestId(TEST_IDS.NOW_INDICATOR);
    expect(indicator).not.toBeInTheDocument();
  });

  it('should set initial position when the TimeGrid component is mounted', () => {
    // Given
    const weekDatesIncludingBaseDate = getWeekDates(baseDate, {
      startDayOfWeek: 0,
      workweek: false,
    });
    const timeGridData = createTimeGridData(weekDatesIncludingBaseDate, {
      hourStart: 0,
      hourEnd: 24,
    });

    // When
    render(<TimeGrid timeGridData={timeGridData} events={[]} />);

    // Then
    const indicator = screen.getByTestId(TEST_IDS.NOW_INDICATOR);
    expect(indicator).toHaveStyle({ top: '50%' });
  });

  it('should overlap(hide) display time on the same position in the time column', () => {
    // Given
    const weekDatesIncludingBaseDate = getWeekDates(baseDate, {
      startDayOfWeek: 0,
      workweek: false,
    });
    const timeGridData = createTimeGridData(weekDatesIncludingBaseDate, {
      hourStart: 0,
      hourEnd: 24,
    });

    // When
    render(<TimeGrid timeGridData={timeGridData} events={[]} />);

    // Then
    const timeColumn = screen.getByTestId(timeColumnTestId);
    const targetTimeColumnText = within(timeColumn).getByText('12 pm');

    expect(
      Array.from(targetTimeColumnText?.parentElement?.classList ?? []).some((className) =>
        className.includes('hidden')
      )
    ).toBe(true);
  });

  it('should move position lower when the time passed', () => {
    // Given
    const weekDatesIncludingBaseDate = getWeekDates(baseDate, {
      startDayOfWeek: 0,
      workweek: false,
    });
    const timeGridData = createTimeGridData(weekDatesIncludingBaseDate, {
      hourStart: 0,
      hourEnd: 24,
    });
    const oneHourHeightPercent = timeGridData.rows[0].height * 2;
    const initialTop = 50;
    render(<TimeGrid timeGridData={timeGridData} events={[]} />);

    const indicator = screen.getByTestId(TEST_IDS.NOW_INDICATOR);
    expect(indicator).toHaveStyle({ top: toPercent(initialTop) });

    // When
    act(() => {
      jest.advanceTimersByTime(MS_PER_HOUR);
    });

    // Then
    expect(indicator).toHaveStyle({ top: toPercent(initialTop + oneHourHeightPercent) });

    // move lower
    // When
    act(() => {
      jest.advanceTimersByTime(MS_PER_HOUR);
    });

    // Then
    expect(indicator).toHaveStyle({ top: toPercent(initialTop + oneHourHeightPercent * 2) });
  });
});
