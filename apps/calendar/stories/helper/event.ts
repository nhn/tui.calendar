import { ScheduleData } from '@src/model';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import Schedule from '@src/model/schedule';

export function createEventModels(data: ScheduleData[]): ScheduleViewModel[] {
  return data.map((datum) => ScheduleViewModel.create(Schedule.create(datum)));
}
