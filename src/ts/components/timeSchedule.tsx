import { h } from 'preact';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { Template } from '@src/components/template';

interface Props {
  viewModel: ScheduleViewModel;
}

export default function TimeSchedule(props: Props) {
  const { model } = props.viewModel;

  return (
    <span style={{ 'background-color': model.bgColor }}>
      <Template template="time" model={model} />
    </span>
  );
}
