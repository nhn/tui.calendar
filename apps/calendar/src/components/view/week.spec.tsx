import { h } from 'preact';

import { Week } from '@src/components/view/week';
import { DEFAULT_EVENT_PANEL, DEFAULT_TASK_PANEL } from '@src/constants/view';
import { initCalendarStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { DEFAULT_DAY_NAMES } from '@src/helpers/dayName';
import { getActivePanels } from '@src/helpers/view';
import EventModel from '@src/model/eventModel';
import { render, screen } from '@src/test/utils';
import TZDate from '@src/time/date';
import { capitalize } from '@src/utils/string';

import type { EventObject } from '@t/events';
import type { Options, WeekOptions } from '@t/options';

function setup(options: Options, events?: EventModel[]) {
  const store = initCalendarStore(options);
  if (events) {
    store.getState().dispatch.calendar.createEvents(events);
  }

  return render(<Week />, { store });
}

describe('eventView and taskView options', () => {
  const cases: WeekOptions[] = [
    { eventView: true, taskView: true },
    { eventView: false, taskView: false },
    { eventView: ['allday'], taskView: ['milestone'] },
    { eventView: ['allday', 'time'], taskView: false },
  ];

  const panels = [...DEFAULT_TASK_PANEL, ...DEFAULT_EVENT_PANEL];

  it.each(cases)(
    'should show/hide the panels in the daily view: { eventView: $eventView, taskView: $eventView }',
    (weekOptions) => {
      // Given
      const { container } = setup({ week: weekOptions });

      // When
      // Nothing

      // Then
      const activePanels = getActivePanels(
        weekOptions.taskView ?? false,
        weekOptions.eventView ?? false
      );
      panels.forEach((panel) => {
        const panelEl = container.querySelector(`.${cls(panel)}`);
        if (activePanels.includes(panel)) {
          expect(panelEl).not.toBeNull();
        } else {
          expect(panelEl).toBeNull();
        }
      });
    }
  );
});

describe('eventFilter option', () => {
  const events: EventModel[] = [];
  const baseDateStr = '2022-05-22T00:00:00+09:00';
  for (let i = 0; i < 2; i += 1) {
    events.push(
      new EventModel({
        id: `${i}`,
        title: `Event ${i}`,
        start: new TZDate(baseDateStr).addMinutes(60 * i),
        end: new TZDate(baseDateStr).addMinutes(60 * i + 30),
        isVisible: !!(i % 2),
      })
    );
  }

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(baseDateStr));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

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

describe('dayNames option', () => {
  // Week view has including date with day name, so let exclude them.
  const extractDayNamesOnly = (text: string | null) => text?.replace(/\d+\s+/g, '');

  it('should show the default day names if the day names option is not specified', () => {
    // Given
    const expectedTextContent = DEFAULT_DAY_NAMES.map((day) => capitalize(day)).join('');

    // When
    setup({});

    // Then
    const header = screen.getByTestId('grid-header-week');
    expect(extractDayNamesOnly(header.textContent)).toBe(expectedTextContent);
  });

  it('should show the day names specified by the dayNames option', () => {
    // Given
    const dayNames: WeekOptions['dayNames'] = ['日', '月', '火', '水', '木', '金', '土'];
    const expectedTextContent = dayNames.map((day) => capitalize(day)).join('');

    // When
    setup({
      week: {
        dayNames,
      },
    });

    // Then
    const header = screen.getByTestId('grid-header-week');
    expect(extractDayNamesOnly(header.textContent)).toBe(expectedTextContent);
  });

  it('should change the order of day names following startDayOfWeek option', () => {
    // Given
    const dayNames: WeekOptions['dayNames'] = ['日', '月', '火', '水', '木', '金', '土'];
    const startDayOfWeek = 1; // Monday
    const expectedTextContent = [
      ...dayNames.slice(startDayOfWeek),
      ...dayNames.slice(0, startDayOfWeek),
    ]
      .map((day) => capitalize(day))
      .join('');

    // When
    setup({
      week: {
        dayNames,
        startDayOfWeek: 1,
      },
    });

    // Then
    const header = screen.getByTestId('grid-header-week');
    expect(extractDayNamesOnly(header.textContent)).toBe(expectedTextContent);
  });
});
