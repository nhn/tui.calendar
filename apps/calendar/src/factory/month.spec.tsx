import Month from '@src/factory/month';
import { act, hasDesiredStartTime, screen } from '@src/test/utils';
import { noop } from '@src/utils/noop';

import { mockMonthViewEvents } from '@stories/mocks/mockMonthViewEvents';

import type { EventObject } from '@t/events';
import type { Options } from '@t/options';

afterEach(() => {
  document.body.innerHTML = '';
  jest.resetAllMocks();
  jest.useRealTimers();
});

describe('Primary Timezone', () => {
  function setup(options: Options = {}, events: EventObject[] = mockMonthViewEvents) {
    const container = document.createElement('div');
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({
      x: 0,
      y: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: 600,
      height: 600,
      toJSON: noop,
    }));

    document.body.appendChild(container);
    const instance = new Month(container, options);
    act(() => {
      instance.createEvents(events);
    });

    return { container, instance };
  }

  const reTargetEventTitle = 'short time event';

  it('should create a zoned event with a string different from the primary timezone', () => {
    // Given
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2022-05-04T00:00:00+09:00'));

    setup(
      {
        timezone: {
          zones: [{ timezoneName: 'Asia/Karachi' }], // UTC+05:00
        },
      },
      [
        {
          id: '1',
          calendarId: 'cal1',
          title: reTargetEventTitle,
          category: 'time',
          start: '2022-05-04T10:00:00+09:00',
          end: '2022-05-04T11:00:00+09:00',
        },
      ]
    );

    // When
    const targetEvent = screen.getByText(reTargetEventTitle);

    // Then
    // From UTC+9 to UTC+5
    expect(hasDesiredStartTime(targetEvent, '06:00')).toBe(true);
  });

  it('should change the start time of events when setting the new timezone option', () => {
    // Given
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2022-05-04T00:00:00+09:00'));
    const { instance } = setup({}, [
      {
        id: '1',
        calendarId: 'cal1',
        title: reTargetEventTitle,
        category: 'time',
        start: '2022-05-04T10:00:00+09:00',
        end: '2022-05-04T11:00:00+09:00',
      },
    ]);
    const prevEvent = screen.getByText(reTargetEventTitle);
    expect(hasDesiredStartTime(prevEvent, '10:00')).toBe(true);

    // When
    act(() => {
      instance.setOptions({
        timezone: {
          zones: [{ timezoneName: 'Asia/Karachi' }], // UTC+05:00
        },
      });
    });

    // Then
    const changedEvent = screen.getByText(reTargetEventTitle);
    expect(hasDesiredStartTime(changedEvent, '06:00')).toBe(true);
  });
});
