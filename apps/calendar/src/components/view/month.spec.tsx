import { h } from 'preact';

import { screen } from '@testing-library/preact';

import { Month } from '@src/components/view/month';
import { initCalendarStore } from '@src/contexts/calendarStore';
import EventModel from '@src/model/eventModel';
import { render } from '@src/test/utils';
import TZDate from '@src/time/date';
import { noop } from '@src/utils/noop';

import type { EventModelData } from '@t/events';
import type { Options } from '@t/options';

describe('Month', () => {
  function setup(options: Options, events?: EventModel[]) {
    const store = initCalendarStore(options);
    if (events) {
      store.getState().dispatch.calendar.createEvents(events);
    }

    return render(<Month />, { store });
  }

  describe('eventFilter option', () => {
    beforeEach(() => {
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
});
