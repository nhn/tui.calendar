import range from 'tui-code-snippet/array/range';

import Week from '@src/factory/week';
import { TEST_IDS } from '@src/test/testIds';
import { act, hasDesiredStartTime, screen, within } from '@src/test/utils';
import TZDate from '@src/time/date';
import { toFormat } from '@src/time/datetime';

import { mockWeekViewEvents } from '@stories/mocks/mockWeekViewEvents';

import type { EventObject } from '@t/events';
import type { Options } from '@t/options';

function setup(options: Options = {}, events: EventObject[] = mockWeekViewEvents) {
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
    jest.useFakeTimers();
    const baseDate = new Date('2022-05-04T00:00:00+09:00');
    jest.setSystemTime(baseDate);

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
    jest.useFakeTimers();
    const baseDate = new Date('2022-05-04T00:00:00+09:00');
    jest.setSystemTime(baseDate);
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
    // To avoid DST when changing timezone, mock the base date of mock events
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

  it('should render zoned events between the end of week and the start of week properly (Small offset difference)', () => {
    // Given
    jest.useFakeTimers();
    const baseDate = new Date('2022-07-20'); // Wednesday
    jest.setSystemTime(baseDate);

    const startOfWeekEventTitle = 'start';
    const endOfWeekEventTitle = 'end';

    // When
    const { instance } = setup(
      {
        timezone: {
          zones: [
            {
              timezoneName: 'Pacific/Auckland', // UTC+12
            },
          ],
        },
      },
      [
        {
          id: startOfWeekEventTitle,
          title: startOfWeekEventTitle,
          start: '2022-07-16T12:00:00Z', // Expected 2022-07-17 00:00:00 in UTC+12
          end: '2022-07-16T13:00:00Z', // Expected 2022-07-17 01:00:00 in UTC+12
        },
        {
          id: endOfWeekEventTitle,
          title: endOfWeekEventTitle,
          start: '2022-07-16T11:00:00Z', // Expected 2022-07-16 23:00:00 in UTC+12
          end: '2022-07-16T11:59:00Z', // Expected 2022-07-16 23:59:00 in UTC+12
        },
      ]
    );

    // Then
    const startOfWeekEvent = screen.getByText(startOfWeekEventTitle);
    expect(startOfWeekEvent).toBeInTheDocument();

    // When
    // Move to previous week
    act(() => {
      instance.prev();
    });

    // Then
    const endOfWeekEvent = screen.getByText(endOfWeekEventTitle);
    expect(endOfWeekEvent).toBeInTheDocument();
  });

  it('should render zoned events between the end of week and the start of week properly (Large offset difference)', () => {
    // Given
    jest.useFakeTimers();
    const baseDate = new Date('2022-07-20'); // Wednesday
    jest.setSystemTime(baseDate);

    const startOfWeekEventTitle = 'start';
    const endOfWeekEventTitle = 'end';

    // When
    const { instance } = setup(
      {
        timezone: {
          zones: [
            {
              timezoneName: 'US/Pacific', // UTC-7 at this time
            },
          ],
        },
      },
      [
        {
          id: startOfWeekEventTitle,
          title: startOfWeekEventTitle,
          start: '2022-07-17T07:00:00Z', // Expected 2022-07-17 00:00:00 in UTC-07
          end: '2022-07-17T08:00:00Z', // Expected 2022-07-17 01:00:00 in UTC-07
        },
        {
          id: endOfWeekEventTitle,
          title: endOfWeekEventTitle,
          start: '2022-07-17T06:00:00Z', // Expected 2022-07-16 23:00:00 in UTC-07
          end: '2022-07-17T06:59:00Z', // Expected 2022-07-16 23:59:00 in UTC-07
        },
      ]
    );

    // Then
    const startOfWeekEvent = screen.getByText(startOfWeekEventTitle);
    expect(startOfWeekEvent).toBeInTheDocument();

    // When
    // Move to previous week
    act(() => {
      instance.prev();
    });

    // Then
    const endOfWeekEvent = screen.getByText(endOfWeekEventTitle);
    expect(endOfWeekEvent).toBeInTheDocument();
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
    hourColumns.forEach((col) => {
      expect(col).toHaveStyle({ width: '50%' });
    });

    const hourRowsTextByColumn = hourColumns.map((hourCol) =>
      Array.from(hourCol.children).map((hourRow) => hourRow.textContent)
    );
    expect(hourRowsTextByColumn).toEqual([
      expectedSecondaryHoursColumn,
      expectedPrimaryHoursColumn,
    ]);
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
    const expectedNowIndicatorLabels = ['[-1]21:00', '04:00'];

    // When
    setup(timezoneOptions);

    // Then
    const nowIndicatorLabels = screen.getAllByTestId(TEST_IDS.NOW_INDICATOR_LABEL);
    expect(nowIndicatorLabels.map((label) => label.textContent)).toEqual(
      expectedNowIndicatorLabels
    );
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
    const expectedNowIndicatorLabels = ['[+1]05:00', '20:00'];

    // When
    setup(timezoneOptions);

    // Then
    const nowIndicatorLabels = screen.getAllByTestId(TEST_IDS.NOW_INDICATOR_LABEL);
    expect(nowIndicatorLabels.map((label) => label.textContent)).toEqual(
      expectedNowIndicatorLabels
    );
  });

  it('should show only primary timezone when the timezonesCollapsed option is enabled', () => {
    // Given
    const option: Options = {
      week: {
        timezonesCollapsed: true,
      },
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

    // When
    setup(option);

    // Then
    const labelContainer = screen.getByRole('columnheader');
    const hourColumns = screen.getAllByRole('rowgroup');

    expect(labelContainer.children).toHaveLength(1);
    expect(hourColumns).toHaveLength(1);
    expect(hourColumns[0]).toHaveStyle({ width: '100%' });
  });
});

describe('Now Indicator', () => {
  it('should show a now indicator when the showNowIndicator option is true', () => {
    // Given
    const options = { week: { showNowIndicator: true } };

    // When
    setup(options);

    // Then
    expect(screen.getByTestId(TEST_IDS.NOW_INDICATOR)).not.toBeNull();
    expect(screen.getByTestId(TEST_IDS.NOW_INDICATOR_LABEL)).not.toBeNull();
  });

  it('should hide a now indicator when the showNowIndicator option is false', () => {
    // Given
    const options = { week: { showNowIndicator: false } };

    // When
    setup(options);

    // Then
    expect(screen.queryByTestId(TEST_IDS.NOW_INDICATOR)).toBeNull();
    expect(screen.queryByTestId(TEST_IDS.NOW_INDICATOR_LABEL)).toBeNull();
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

describe('Daylight Saving Time Transition', () => {
  let eventResult: EventObject = {};
  const resultSpy = jest.fn((event) => {
    eventResult = event;
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    resultSpy.mockClear();
  });

  describe('Northern Hemisphere', () => {
    const options = {
      timezone: {
        zones: [
          {
            timezoneName: 'US/Pacific',
          },
        ],
      },
    };

    it('should render an event during forward transition (02:00 ~ 03:00)', () => {
      // Given
      const baseDate = new Date('2022-03-14T00:00:00Z');
      jest.setSystemTime(baseDate);

      const { instance } = setup(options, []);
      instance.on('afterRenderEvent', resultSpy);

      // When
      act(() => {
        instance.createEvents([
          {
            id: 'forward',
            title: 'Forward Transition',
            start: '2022-03-13T09:00:00Z', // 02:00 in UTC-7
            end: '2022-03-13T10:00:00Z', // 03:00 in UTC-7
            category: 'time',
          },
        ]);
      });

      // Then
      expect(resultSpy).toHaveBeenCalled();
      expect(toFormat(eventResult.start as TZDate, 'YYYYMMDD')).toBe('20220313');
      expect(toFormat(eventResult.start as TZDate, 'HH:mm')).toBe('01:00');
      expect(toFormat(eventResult.end as TZDate, 'YYYYMMDD')).toBe('20220313');
      expect(toFormat(eventResult.end as TZDate, 'HH:mm')).toBe('03:00');
    });

    it('should render an event during forward transition (01:00 ~ 04:00)', () => {
      // Given
      const baseDate = new Date('2022-03-14T00:00:00Z');
      jest.setSystemTime(baseDate);

      const { instance } = setup(options, []);
      instance.on('afterRenderEvent', resultSpy);

      // When
      act(() => {
        instance.createEvents([
          {
            id: 'forward',
            title: 'Forward Transition',
            start: '2022-03-13T09:00:00Z', // 01:00 in UTC-8
            end: '2022-03-13T11:00:00Z', // 04:00 in UTC-7
            category: 'time',
          },
        ]);
      });

      // Then
      expect(resultSpy).toHaveBeenCalled();
      expect(toFormat(eventResult.start as TZDate, 'YYYYMMDD')).toBe('20220313');
      expect(toFormat(eventResult.start as TZDate, 'HH:mm')).toBe('01:00');
      expect(toFormat(eventResult.end as TZDate, 'YYYYMMDD')).toBe('20220313');
      expect(toFormat(eventResult.end as TZDate, 'HH:mm')).toBe('04:00');
    });

    it('should render an event during fallback transition (01:00 ~ 02:00)', () => {
      // Given
      const baseDate = new Date('2022-11-07T00:00:00Z');
      jest.setSystemTime(baseDate);

      const { instance } = setup(options, []);
      instance.on('afterRenderEvent', resultSpy);

      // When
      act(() => {
        instance.createEvents([
          {
            id: 'fallback',
            title: 'Fallback Transition',
            start: '2022-11-06T08:00:00Z', // 01:00 in UTC-7
            end: '2022-11-06T10:00:00Z', // 02:00 in UTC-7
            category: 'time',
          },
        ]);
      });

      // Then
      expect(resultSpy).toHaveBeenCalled();
      expect(toFormat(eventResult.start as TZDate, 'YYYYMMDD')).toBe('20221106');
      expect(toFormat(eventResult.start as TZDate, 'HH:mm')).toBe('01:00');
      expect(toFormat(eventResult.end as TZDate, 'YYYYMMDD')).toBe('20221106');
      expect(toFormat(eventResult.end as TZDate, 'HH:mm')).toBe('02:00');
    });

    it('should render an event during fallback transition (01:00 ~ 03:00)', () => {
      // Given
      const baseDate = new Date('2022-11-07T00:00:00Z');
      jest.setSystemTime(baseDate);

      const { instance } = setup(options, []);
      instance.on('afterRenderEvent', resultSpy);

      // When
      act(() => {
        instance.createEvents([
          {
            id: 'fallback',
            title: 'Fallback Transition',
            start: '2022-11-06T08:00:00Z', // 01:00 in UTC-7
            end: '2022-11-06T11:00:00Z', // 03:00 in UTC-7
            category: 'time',
          },
        ]);
      });

      // Then
      expect(resultSpy).toHaveBeenCalled();
      expect(toFormat(eventResult.start as TZDate, 'YYYYMMDD')).toBe('20221106');
      expect(toFormat(eventResult.start as TZDate, 'HH:mm')).toBe('01:00');
      expect(toFormat(eventResult.end as TZDate, 'YYYYMMDD')).toBe('20221106');
      expect(toFormat(eventResult.end as TZDate, 'HH:mm')).toBe('03:00');
    });
  });

  describe('Southern Hemisphere', () => {
    const options: Options = {
      timezone: {
        zones: [
          {
            timezoneName: 'Pacific/Auckland',
          },
        ],
      },
    };

    it('should render an event during forward transition (01:00 ~ 03:00)', () => {
      // Given
      const baseDate = new Date('2022-09-26T00:00:00Z');
      jest.setSystemTime(baseDate);

      const { instance } = setup(options, []);
      instance.on('afterRenderEvent', resultSpy);

      // When
      act(() => {
        instance.createEvents([
          {
            id: 'forward',
            title: 'Forward Transition',
            start: '2022-09-24T13:00:00Z', // 01:00 in UTC+12
            end: '2022-09-24T14:00:00Z', // 03:00 in UTC+13 - Forward gap
            category: 'time',
          },
        ]);
      });

      // Then
      expect(resultSpy).toHaveBeenCalled();
      expect(toFormat(eventResult.start as TZDate, 'YYYYMMDD')).toBe('20220925');
      expect(toFormat(eventResult.start as TZDate, 'HH:mm')).toBe('01:00');
      expect(toFormat(eventResult.end as TZDate, 'YYYYMMDD')).toBe('20220925');
      expect(toFormat(eventResult.end as TZDate, 'HH:mm')).toBe('03:00');
    });

    it('should render an event during fallback transition', () => {
      // Given
      const baseDate = new Date('2022-04-04T00:00:00Z');
      jest.setSystemTime(baseDate);

      const { instance } = setup(options, []);
      instance.on('afterRenderEvent', resultSpy);

      // When
      act(() => {
        instance.createEvents([
          {
            id: 'fallback',
            title: 'Fallback Transition',
            category: 'time',
            start: '2022-04-02T12:00:00Z', // 01:00 in UTC+13
            end: '2022-04-02T14:00:00Z', // 02:00 in UTC+12 - Fallback gap
          },
        ]);
      });

      // Then
      expect(resultSpy).toHaveBeenCalled();
      expect(toFormat(eventResult.start as TZDate, 'YYYYMMDD')).toBe('20220403');
      expect(toFormat(eventResult.start as TZDate, 'HH:mm')).toBe('01:00');
      expect(toFormat(eventResult.end as TZDate, 'YYYYMMDD')).toBe('20220403');
      expect(toFormat(eventResult.end as TZDate, 'HH:mm')).toBe('02:00');
    });
  });
});
