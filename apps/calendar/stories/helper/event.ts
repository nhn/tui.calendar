import { EventModelData } from '@src/model';
import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';

export function createEventModels(data: EventModelData[]): EventUIModel[] {
  return data.map((datum) => EventUIModel.create(EventModel.create(datum)));
}
