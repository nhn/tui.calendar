import { h } from 'preact';
import TimeSchedule from '@src/components/timeSchedule';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { InstanceContext, getNewAppContext } from '@src/model/context';

export default { title: 'Schedule Block' };

export const timeSchedule = () => {
  const schedule = Schedule.create({
    title: 'Time Schedule 2',
    bgColor: 'green'
  });
  const scheduleViewModel = ScheduleViewModel.create(schedule);

  return (
    <InstanceContext.Provider value={getNewAppContext()}>
      <TimeSchedule viewModel={scheduleViewModel} />
    </InstanceContext.Provider>
  );
};
