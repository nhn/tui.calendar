import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';

import type { EventModelData } from '@t/events';

export function createEventModels(data: EventModelData[]): EventUIModel[] {
  return data.map((datum) => EventUIModel.create(EventModel.create(datum)));
}
