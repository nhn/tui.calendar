import { ScheduleData } from '@src/model';
import EventUIModel from '@src/model/eventUIModel';
import Schedule from '@src/model/schedule';

export function createEventModels(data: ScheduleData[]): EventUIModel[] {
  return data.map((datum) => EventUIModel.create(Schedule.create(datum)));
}
