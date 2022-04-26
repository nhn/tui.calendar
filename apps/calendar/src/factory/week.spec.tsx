import Week from '@src/factory/week';
import { act, screen } from '@src/test/utils';

import { mockWeekViewEvents } from '@stories/mocks/mockWeekViewEvents';

import type { Options } from '@t/options';

// file.only

function setup(options: Options = {}) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const instance = new Week(container, options);
  act(() => {
    instance.createEvents(mockWeekViewEvents);
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
    const timedEvents = screen.getAllByTestId(/time-event/);
    const possibleShortEvent = timedEvents.find((e) => e.textContent?.includes('00:00'));

    // Then
    expect(possibleShortEvent).toBeInTheDocument();
  });

  it('should change events immediately when timezone option changes', () => {
    // Given
    const { instance } = setup();
    let timedEvents = screen.getAllByTestId(/time-event/);
    const currentShortEvent = timedEvents.find((e) => e.textContent?.includes('04:00'));
    expect(currentShortEvent).toBeInTheDocument();

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

    timedEvents = screen.getAllByTestId(/time-event/);
    const possibleShortEvent = timedEvents.find((e) => e.textContent?.includes('00:00'));

    // Then
    expect(possibleShortEvent).toBeInTheDocument();
  });
});
