import { h } from 'preact';

import { Month } from '@src/components/view/month';
import { initCalendarStore } from '@src/contexts/calendarStore';
import { initThemeStore } from '@src/contexts/themeStore';
import EventModel from '@src/model/eventModel';
import { render, screen } from '@src/test/utils';
import TZDate from '@src/time/date';
import { noop } from '@src/utils/noop';

import type { EventObject } from '@t/events';
import type { MonthOptions, Options } from '@t/options';

function setup(options: Options, events?: EventModel[]) {
  const store = initCalendarStore(options);
  const theme = initThemeStore(options.theme);

  if (events) {
    store.getState().dispatch.calendar.createEvents(events);
  }

  return render(<Month />, { store, theme });
}

describe('eventFilter option', () => {
  beforeAll(() => {
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 100,
      height: 100,
      toJSON: noop,
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const events: EventModel[] = [];
  for (let i = 0; i < 2; i += 1) {
    events.push(
      new EventModel({
        id: `${i}`,
        title: `Event ${i}`,
        start: new TZDate().addMinutes(60 * i),
        end: new TZDate().addMinutes(60 * i + 30),
        isVisible: !!(i % 2),
      })
    );
  }

  it('should show only the events which of isVisible is true when the eventFilter option is not specified.', () => {
    // Given
    setup({}, events);

    // When
    // Nothing

    // Then
    const visibleEvent = events.find((event) => event.isVisible) as EventModel;
    const invisibleEvent = events.find((event) => !event.isVisible) as EventModel;
    expect(screen.queryByText(visibleEvent.title)).toBeInTheDocument();
    expect(screen.queryByText(invisibleEvent.title)).not.toBeInTheDocument();
  });

  it('should show only the events that pass the eventFilter function.', () => {
    // Given
    const eventFilter = (event: EventObject) => !!(Number(event.id) % 2);
    setup({ eventFilter }, events);

    // When
    // Nothing

    // Then
    const visibleEvent = events.find(eventFilter) as EventModel;
    const invisibleEvent = events.find((event) => !eventFilter(event)) as EventModel;
    expect(screen.queryByText(visibleEvent.title)).toBeInTheDocument();
    expect(screen.queryByText(invisibleEvent.title)).not.toBeInTheDocument();
  });
});

describe('dayNames Option', () => {
  it('should show the default day names if the day names option is not specified.', () => {
    // Given
    const dayNames: MonthOptions['dayNames'] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // When
    setup({});

    // Then
    const header = screen.getByTestId('grid-header-month');

    expect(header).toHaveTextContent(dayNames.join(''));
  });

  it('should show the day names specified by the day names option.', () => {
    // Given
    const dayNames: MonthOptions['dayNames'] = ['日', '月', '火', '水', '木', '金', '土'];

    // When
    setup({
      month: {
        dayNames,
      },
    });

    // Then
    const header = screen.getByTestId('grid-header-month');
    expect(header).toHaveTextContent(dayNames.join(''));
  });

  it('should change day names following startDayOfWeek option.', () => {
    // Given
    const dayNames: MonthOptions['dayNames'] = ['日', '月', '火', '水', '木', '金', '土'];
    const startDayOfWeek = 1; // Monday

    // When
    setup({
      month: {
        dayNames,
        startDayOfWeek,
      },
    });

    // Then
    const header = screen.getByTestId('grid-header-month');
    expect(header).toHaveTextContent(dayNames.slice(startDayOfWeek).concat('日').join(''));
  });
});

describe('startDayOfWeek Option', () => {
  it('should change the start day of week with default day names', () => {
    // Given
    const startDayOfWeek = 1; // Monday
    const normalDayNameColor = 'white';
    const sundayDayNameColor = 'red';

    // When
    setup({
      month: {
        startDayOfWeek,
      },
      theme: {
        common: {
          dayName: {
            color: normalDayNameColor,
          },
          holiday: {
            color: sundayDayNameColor,
          },
        },
      },
    });

    // Then
    const { 0: monday, length, [length - 1]: sunday } = screen.getAllByTestId(/dayName-month-/);

    expect(monday).toHaveStyle({ color: normalDayNameColor });
    expect(sunday).toHaveStyle({ color: sundayDayNameColor });
  });

  it('should change start day of week with custom day names', () => {
    // Given
    const startDayOfWeek = 2; // Tuesday
    const givenDayNames: MonthOptions['dayNames'] = ['日', '月', '火', '水', '木', '金', '土'];
    const normalDayNameColor = 'white';
    const sundayDayNameColor = 'red';

    // When
    setup({
      month: {
        startDayOfWeek,
        dayNames: givenDayNames,
      },
      theme: {
        common: {
          dayName: {
            color: normalDayNameColor,
          },
          holiday: {
            color: sundayDayNameColor,
          },
        },
      },
    });

    // Then
    const header = screen.getByTestId('grid-header-month');
    expect(header).toHaveTextContent(
      givenDayNames.slice(startDayOfWeek).concat(givenDayNames.slice(0, startDayOfWeek)).join('')
    );
    const { 0: tuesday, length, [length - 2]: sunday } = screen.getAllByTestId(/dayName-month-/);

    expect(tuesday).toHaveStyle({ color: normalDayNameColor });
    expect(sunday).toHaveStyle({ color: sundayDayNameColor });
  });
});
