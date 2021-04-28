import type TZDate from '@src/time/date';

export interface BaseEvent {
  start: TZDate;
  end: TZDate;
}

export interface MilestoneEvent extends BaseEvent {
  name: 'milestone';
  type: 'daygrid';
}
