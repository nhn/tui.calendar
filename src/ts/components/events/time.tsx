import { h } from 'preact';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { Template } from '@src/components/template';

interface Props {
  viewModel: ScheduleViewModel;
}

export function TimeEvent(props: Props) {
  const { model } = props.viewModel;

  return (
    <span style={{ 'background-color': model.bgColor }}>
      <Template template="time" model={model} />
    </span>
  );
}
TimeEvent.displayName = 'TimeEvent';
