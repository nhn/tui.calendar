import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';

import type { EventObject } from '@t/events';

export function createEventModels(data: EventObject[]): EventUIModel[] {
  return data.map((datum) => EventUIModel.create(EventModel.create(datum)));
}
