import { ScheduleData } from '@src/model';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';

export function createEventModels(data: ScheduleData[]): ScheduleViewModel[] {
  return data.map((datum) => ScheduleViewModel.create(Schedule.create(datum)));
}
