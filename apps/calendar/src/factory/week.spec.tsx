import range from 'tui-code-snippet/array/range';

import Week from '@src/factory/week';
import { currentTimeLabelTestId } from '@src/test/testIds';
import { act, hasDesiredStartTime, screen, within } from '@src/test/utils';
import TZDate from '@src/time/date';
import { toFormat } from '@src/time/datetime';

import { mockWeekViewEvents } from '@stories/mocks/mockWeekViewEvents';

import type { EventModelData } from '@t/events';
import type { Options } from '@t/options';

function setup(options: Options = {}, events: EventModelData[] = mockWeekViewEvents) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const instance = new Week(container, options);
  act(() => {
    instance.createEvents(events);
  });

  return { container, instance };
}

afterEach(() => {
  jest.useRealTimers();
  document.body.innerHTML = '';
});

describe('Basic', () => {
  it('should render with mock events', () => {
    // Given
    const { container } = setup();

    // Then
    expect(container).not.toBeEmptyDOMElement();
  });
});

describe('Primary Timezone', () => {
  const reTargetEvent = /short time event/i;

  it('should create a zoned event with a string different from the primary timezone', () => {
    // Given
    const baseDate = new Date('2022-05-04T00:00:00+09:00');
    jest.spyOn(Date, 'now').mockImplementationOnce(() => baseDate.getTime());
    const { instance } = setup(
      {
        timezone: {
          zones: [{ timezoneName: 'Asia/Karachi' }], // UTC+05:00
        },
      },
      [
        {
          id: '1',
          calendarId: 'cal1',
          title: 'short time event',
          category: 'time',
          start: '2022-05-04T04:00:00+09:00',
          end: '2022-05-04T06:00:00+09:00',
        },
      ]
    );
    act(() => {
      instance.setDate(baseDate);
    });

    // When
    const targetEvent = screen.getByText(reTargetEvent);

    // Then
    expect(hasDesiredStartTime(targetEvent, '00:00')).toBe(true);
  });

  it('should create zoned event with a string same as the primary timezone', () => {
    // Given
    const baseDate = new Date('2022-05-04T00:00:00+09:00');
    jest.spyOn(Date, 'now').mockImplementationOnce(() => baseDate.getTime());
    const { instance } = setup(
      {
        timezone: {
          zones: [{ timezoneName: 'Asia/Karachi' }], // UTC+05:00
        },
      },
      [
        {
          id: '1',
          calendarId: 'cal1',
          title: 'short time event',
          category: 'time',
          start: '2022-05-04T04:00:00+05:00',
          end: '2022-05-04T06:00:00+05:00',
        },
      ]
    );
    act(() => {
      instance.setDate(baseDate);
    });

    // When
    const targetEvent = screen.getByText(reTargetEvent);

    // Then
    expect(hasDesiredStartTime(targetEvent, '04:00')).toBe(true);
  });

  it('should apply timezone option to timed events', () => {
    // Given
    setup({
      timezone: {
        zones: [
          {
            timezoneName: 'Asia/Karachi', // UTC+5
          },
        ],
      },
    });

    // When
    const targetEvent = screen.getByText(reTargetEvent);

    // Then
    expect(hasDesiredStartTime(targetEvent, '00:00')).toBe(true);
  });

  it('should change start & end time of events when timezone option changes from the local timezone', () => {
    // Given
    const { instance } = setup();
    let targetEvent = screen.getByText(reTargetEvent);
    expect(hasDesiredStartTime(targetEvent, '04:00')).toBe(true);

    // When
    act(() => {
      instance.setOptions({
        timezone: {
          zones: [
            {
              timezoneName: 'Asia/Karachi', // UTC+5
            },
          ],
        },
      });
    });

    // Then
    targetEvent = screen.getByText(reTargetEvent);
    expect(hasDesiredStartTime(targetEvent, '00:00')).toBe(true);
  });

  it('should change start & end time of events when timezone option changes from another timezone', () => {
    // Given
    // To avoid DST when changing timezone
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date('2022-04-01T00:00:00').getTime());
    const { instance } = setup({
      timezone: {
        zones: [
          {
            timezoneName: 'Asia/Karachi', // UTC+5
          },
        ],
      },
    });
    let targetEvent = screen.getByText(reTargetEvent);

    expect(hasDesiredStartTime(targetEvent, '00:00')).toBe(true);

    // When
    act(() => {
      instance.setOptions({
        timezone: {
          zones: [
            {
              timezoneName: 'Australia/Sydney', // UTC+10
            },
          ],
        },
      });
    });

    // Then
    targetEvent = screen.getByText(reTargetEvent);

    expect(hasDesiredStartTime(targetEvent, '05:00')).toBe(true);
  });
});

describe('Multiple Timezone', () => {
  it('should not render timezone labels when only one timezone is given', () => {
    // Given
    const timezoneOptions: Options = {
      timezone: {
        zones: [
          {
            timezoneName: 'Asia/Seoul',
          },
        ],
      },
    };

    // When
    setup(timezoneOptions);

    // Then
    expect(screen.queryByRole('columnheader')).toBeNull();
  });

  it('should render one hours column when only one timezone is given', () => {
    // Given
    const timezoneOptions: Options = {
      timezone: {
        zones: [
          {
            timezoneName: 'Asia/Seoul',
          },
        ],
      },
    };
    const expectedHoursColumn = range(0, 25).map((hour) =>
      toFormat(new TZDate(2022, 6, 1, hour), 'hh tt')
    );

    // When
    const { instance } = setup(timezoneOptions);
    act(() => {
      // Set render date to the past so that current time indicator doesn't show up
      instance.setDate('2020-06-01');
    });

    // Then
    const hoursColumn = screen.getAllByRole('rowgroup');
    expect(hoursColumn.length).toBe(1);

    const hourRows = Array.from(hoursColumn[0].children).map((hourRow) => hourRow.textContent);
    expect(hourRows).toEqual(expectedHoursColumn);
  });

  it('should render default timezone labels', () => {
    // Given
    const timezoneOptions: Options = {
      timezone: {
        zones: [
          {
            timezoneName: 'Asia/Seoul', // GMT+09:00
          },
          {
            timezoneName: 'Asia/Karachi', // GMT+05:00
          },
        ],
      },
    };
    const expectedLabels = ['GMT+05:00', 'GMT+09:00'];

    // When
    setup(timezoneOptions);

    // Then
    const labelContainer = screen.getByRole('columnheader');
    const labels = within(labelContainer).getAllByRole('gridcell');

    expect(labels.map((label) => label.textContent)).toEqual(expectedLabels);
  });

  it('should render custom timezone labels', () => {
    // Given
    const timezoneOptions: Options = {
      timezone: {
        zones: [
          {
            timezoneName: 'Asia/Seoul', // GMT+09:00
            displayLabel: '+09',
          },
          {
            timezoneName: 'Asia/Karachi', // GMT+05:00
            displayLabel: '+05',
          },
        ],
      },
    };
    const expectedLabels = ['+05', '+09'];

    // When
    setup(timezoneOptions);

    // Then
    const labelContainer = screen.getByRole('columnheader');
    const labels = within(labelContainer).getAllByRole('gridcell');

    expect(labels.map((label) => label.textContent)).toEqual(expectedLabels);
  });
  it('should render multiple hours column when multiple timezone is given', () => {
    // Given
    const timezoneOptions: Options = {
      timezone: {
        zones: [
          {
            timezoneName: 'Asia/Seoul',
          },
          {
            timezoneName: 'Asia/Karachi',
          },
        ],
      },
    };
    const expectedPrimaryHoursColumn = range(0, 25).map((hour) =>
      toFormat(new TZDate(2022, 6, 1, hour), 'hh tt')
    );
    // -4 hours each
    const expectedSecondaryHoursColumn = range(0, 25).map((hour) =>
      toFormat(new TZDate(2022, 6, 1, hour - 4), 'HH:mm')
    );

    // When
    const { instance } = setup(timezoneOptions);
    act(() => {
      // Set render date to the past so that current time indicator doesn't show up
      instance.setDate('2020-06-01');
    });

    // Then
    const hourColumns = screen.getAllByRole('rowgroup');
    expect(hourColumns.length).toBe(2);

    const hourRowsByColumn = hourColumns.map((hourCol) =>
      Array.from(hourCol.children).map((hourRow) => hourRow.textContent)
    );
    expect(hourRowsByColumn).toEqual([expectedSecondaryHoursColumn, expectedPrimaryHoursColumn]);
  });

  it('should render current time of each timezones including date differences (minus 1)', () => {
    // Given
    jest.useFakeTimers();
    const baseDate = new Date('2022-05-16T04:00:00Z'); // Make sure it's on UTC
    jest.setSystemTime(baseDate);
    const timezoneOptions: Options = {
      timezone: {
        zones: [
          {
            timezoneName: 'Etc/UTC',
          },
          {
            timezoneName: 'US/Pacific', // UTC -7
          },
        ],
      },
    };
    const expectedCurrentTimeLabels = ['[-1]21:00', '04:00'];

    // When
    setup(timezoneOptions);

    // Then
    const currentTimeLabels = screen.getAllByTestId(currentTimeLabelTestId);
    expect(currentTimeLabels.map((label) => label.textContent)).toEqual(expectedCurrentTimeLabels);
  });

  it('should render current time of each timezones including date differences (plus 1)', () => {
    // Given
    jest.useFakeTimers();
    const baseDate = new Date('2022-05-16T20:00:00Z'); // Make sure it's on UTC
    jest.setSystemTime(baseDate);
    const timezoneOptions: Options = {
      timezone: {
        zones: [
          {
            timezoneName: 'Etc/UTC',
          },
          {
            timezoneName: 'Asia/Seoul', // UTC +9
          },
        ],
      },
    };
    const expectedCurrentTimeLabels = ['[+1]05:00', '20:00'];

    // When
    setup(timezoneOptions);

    // Then
    const currentTimeLabels = screen.getAllByTestId(currentTimeLabelTestId);
    expect(currentTimeLabels.map((label) => label.textContent)).toEqual(expectedCurrentTimeLabels);
  });
});

describe('Timezone Collapse Button', () => {
  it('should show timezone collapse button when the showTimezoneCollapseButton option is enabled', () => {
    // Given
    const option: Options = {
      week: {
        showTimezoneCollapseButton: true,
      },
      timezone: {
        zones: [
          {
            timezoneName: 'Asia/Seoul',
          },
          {
            timezoneName: 'Asia/Karachi',
          },
        ],
      },
    };

    // When
    setup(option);

    // Then
    const timeLabelsContainer = screen.getByRole('columnheader');
    expect(within(timeLabelsContainer).getByRole('button')).toBeInTheDocument();
  });

  it('should have different arrow icon according to the timezonesCollapsed option', () => {
    // Given
    const option: Options = {
      week: {
        showTimezoneCollapseButton: true,
        timezonesCollapsed: true, // default is false.
      },
      timezone: {
        zones: [
          {
            timezoneName: 'Asia/Seoul',
          },
          {
            timezoneName: 'Asia/Karachi',
          },
        ],
      },
    };

    // When (collapsed)
    const { instance } = setup(option);

    // Then
    let collapseButton = within(screen.getByRole('columnheader')).getByRole('button');
    let collapseButtonIcon = within(collapseButton).getByRole('img');
    expect(collapseButtonIcon.classList.toString()).toMatch(/right/);
    expect(collapseButton).toHaveAttribute('aria-expanded', 'false');

    // When (expanded)
    act(() => {
      instance.setOptions({
        week: {
          timezonesCollapsed: false,
        },
      });
    });

    // Then
    collapseButton = within(screen.getByRole('columnheader')).getByRole('button');
    collapseButtonIcon = within(collapseButton).getByRole('img');
    expect(collapseButtonIcon.classList.toString()).toMatch(/left/);
    expect(collapseButton).toHaveAttribute('aria-expanded', 'true');
  });
});
