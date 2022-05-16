import { h } from 'preact';

import range from 'tui-code-snippet/array/range';

import { Week } from '@src/components/view/week';
import { DEFAULT_EVENT_PANEL, DEFAULT_TASK_PANEL } from '@src/constants/view';
import { initCalendarStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { getActivePanels } from '@src/helpers/view';
import EventModel from '@src/model/eventModel';
import { render, screen, within } from '@src/test/utils';
import TZDate from '@src/time/date';
import { toFormat } from '@src/time/datetime';

import type { EventModelData } from '@t/events';
import type { Options, WeekOptions } from '@t/options';

describe('week', () => {
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
    for (let i = 0; i < 2; i += 1) {
      events.push(
        EventModel.create({
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
      const eventFilter = (event: EventModelData) => !!(Number(event.id) % 2);
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

  describe('Multiple Timezone', () => {
    it('should not render timezone labels when only one timezone is given', () => {
      // Given
      const timezoneOption: Options = {
        timezone: {
          zones: [
            {
              timezoneName: 'Asia/Seoul',
            },
          ],
        },
      };

      // When
      setup(timezoneOption);

      // Then
      expect(screen.queryByRole('columnheader')).toBeNull();
    });

    it('should render one hours column when only one timezone is given', () => {
      // Given
      const timezoneOption: Options = {
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
      setup(timezoneOption);

      // Then
      const hourRowsContainer = screen.getAllByRole('rowgroup');
      expect(hourRowsContainer.length).toBe(1);

      const hourRows = Array.from(hourRowsContainer[0].children).map(
        (hourRow) => hourRow.textContent
      );
      expect(hourRows).toEqual(expectedHoursColumn);
    });

    it('should render default timezone labels', () => {
      // Given
      const timezoneOption: Options = {
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
      setup(timezoneOption);

      // Then
      const labelContainer = screen.getByRole('columnheader');
      const labels = within(labelContainer).getAllByRole('gridcell');

      expect(labels.map((label) => label.textContent)).toEqual(expectedLabels);
    });

    it('should render custom timezone labels', () => {
      // Given
      const timezoneOption: Options = {
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
      setup(timezoneOption);

      // Then
      const labelContainer = screen.getByRole('columnheader');
      const labels = within(labelContainer).getAllByRole('gridcell');

      expect(labels.map((label) => label.textContent)).toEqual(expectedLabels);
    });
  });
});
