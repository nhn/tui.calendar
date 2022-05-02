import Week from '@src/factory/week';
import { act, screen } from '@src/test/utils';
import { isPresent } from '@src/utils/type';

import { mockWeekViewEvents } from '@stories/mocks/mockWeekViewEvents';

import type { EventModelData } from '@t/events';
import type { Options } from '@t/options';
import type { FormattedTimeString } from '@t/time/datetime';

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
  function hasDesiredStartTime(el: HTMLElement, startTimeStr: FormattedTimeString) {
    let node: HTMLElement | null = el;
    while (isPresent(node)) {
      if (node.textContent?.includes(startTimeStr)) {
        return true;
      }
      node = node.parentElement;
    }

    return false;
  }
  const reTargetEvent = /short time event/i;

  it('should create a zoned event with a string different from the primary timezone', () => {
    // Given
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date('2022-05-04T00:00:00+09:00').getTime());
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
          title: 'short time event',
          category: 'time',
          start: '2022-05-04T04:00:00+09:00',
          end: '2022-05-04T06:00:00+09:00',
        },
      ]
    );

    // When
    const el = screen.getByText(reTargetEvent);

    // Then
    expect(hasDesiredStartTime(el, '00:00')).toBe(true);
  });

  it('should create zoned event with a string same as the primary timezone', () => {
    // Given
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date('2022-05-04T00:00:00+09:00').getTime());
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
          title: 'short time event',
          category: 'time',
          start: '2022-05-04T04:00:00+05:00',
          end: '2022-05-04T06:00:00+05:00',
        },
      ]
    );

    // When
    const el = screen.getByText(reTargetEvent);

    // Then
    expect(hasDesiredStartTime(el, '04:00')).toBe(true);
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
