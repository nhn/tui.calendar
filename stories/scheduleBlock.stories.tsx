import { h } from 'preact';
import Provider from 'preact-context-provider';
import TimeSchedule from '@src/components/timeSchedule';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { Template } from '@src/model';
import { registerTemplateConfig } from '@src/template';

export default { title: 'Schedule Block' };

export const timeSchedule = () => {
  const schedule = Schedule.create({
    title: 'Time Schedule 2',
    bgColor: 'green'
  });
  const scheduleViewModel = ScheduleViewModel.create(schedule);
  const templates: Template = registerTemplateConfig();

  return (
    <Provider templates={templates}>
      <TimeSchedule viewModel={scheduleViewModel} />
    </Provider>
  );
};
