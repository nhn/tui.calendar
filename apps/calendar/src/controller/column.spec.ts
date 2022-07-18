import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import type { EventObject, EventObjectWithDefaultValues } from '@src/types/events';
import type { CollapseDuplicateEventsOptions } from '@src/types/options';

import { setRenderInfoOfUIModels } from './column';

function createEventUIModels(data: EventObject[]): EventUIModel[] {
  return data.map((datum) => new EventUIModel(new EventModel(datum)));
}

function createCurrentDateWithTime(h: number, m: number) {
  const today = new TZDate();
  today.setHours(h, m, 0, 0);

  return today;
}

describe('collapseDuplicateEvents option', () => {
  let eventUIModels: EventUIModel[];

  beforeEach(() => {
    eventUIModels = createEventUIModels([
      {
        id: '1',
        calendarId: 'cal1',
        title: 'duplicate event',
        start: createCurrentDateWithTime(3, 0),
        end: createCurrentDateWithTime(4, 0),
      },
      {
        id: '2',
        calendarId: 'cal2',
        title: 'duplicate event',
        start: createCurrentDateWithTime(3, 0),
        end: createCurrentDateWithTime(4, 0),
        goingDuration: 60,
      },
      {
        id: '3',
        calendarId: 'cal3',
        title: 'duplicate event',
        start: createCurrentDateWithTime(3, 0),
        end: createCurrentDateWithTime(4, 0),
        goingDuration: 30,
        comingDuration: 60,
      },
    ]);
  });

  const startColumnTime = createCurrentDateWithTime(0, 0);
  const endColumnTime = createCurrentDateWithTime(24, 0);

  it('when it is false, duplicate events have the same widths.', () => {
    // Given
    // nothing

    // When
    const result = setRenderInfoOfUIModels(eventUIModels, startColumnTime, endColumnTime, -1);

    // Then
    result.forEach((uiModel) => {
      expect(uiModel.width).toBeCloseTo(100 / result.length);
    });
  });

  it('when it sets, the main event is expanded and the others are collasped.', () => {
    // Given
    const mainEventId = eventUIModels[0].model.id;
    const collapseDuplicateEventsOptions: CollapseDuplicateEventsOptions = {
      getDuplicateEvents(targetEvent, events) {
        return events
          .filter((event) => event.title === targetEvent.title)
          .sort((a, b) => (a.id > b.id ? 1 : -1));
      },
      getMainEvent(events) {
        return events.find((event) => event.id === mainEventId) as EventObjectWithDefaultValues;
      },
    };

    // When
    const result = setRenderInfoOfUIModels(
      eventUIModels,
      startColumnTime,
      endColumnTime,
      -1,
      collapseDuplicateEventsOptions
    );

    // Then
    result.forEach((uiModel) => {
      if (uiModel.model.id === mainEventId) {
        expect(uiModel.width).toBeCloseTo(100 - (result.length - 1) * 5);
      } else {
        expect(uiModel.width).toBeCloseTo(5);
      }
    });
  });

  it('when it sets and one of the duplicate events is selected, the selected event is expanded and the others are collapsed.', () => {
    // Given
    const selectedDuplicateEventCid = eventUIModels[1].cid();
    const mainEventId = eventUIModels[0].model.id;
    const collapseDuplicateEventsOptions: CollapseDuplicateEventsOptions = {
      getDuplicateEvents(targetEvent, events) {
        return events
          .filter((event) => event.title === targetEvent.title)
          .sort((a, b) => (a.id > b.id ? 1 : -1));
      },
      getMainEvent(events) {
        return events.find((event) => event.id === mainEventId) as EventObjectWithDefaultValues;
      },
    };

    // When
    const result = setRenderInfoOfUIModels(
      eventUIModels,
      startColumnTime,
      endColumnTime,
      selectedDuplicateEventCid,
      collapseDuplicateEventsOptions
    );

    // Then
    result.forEach((uiModel) => {
      if (uiModel.cid() === selectedDuplicateEventCid) {
        expect(uiModel.width).toBeCloseTo(100 - (result.length - 1) * 5);
      } else {
        expect(uiModel.width).toBeCloseTo(5);
      }
    });
  });
});
