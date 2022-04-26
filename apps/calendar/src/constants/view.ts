import type { eventViewValue, taskViewValue, ViewType } from '@t/options';

export const VIEW_TYPE: {
  [key: string]: ViewType;
} = {
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day',
};

export const DEFAULT_TASK_PANEL: taskViewValue[] = ['milestone', 'task'];

export const DEFAULT_EVENT_PANEL: eventViewValue[] = ['allday', 'time'];
