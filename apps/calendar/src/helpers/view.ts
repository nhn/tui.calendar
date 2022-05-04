import { DEFAULT_EVENT_PANEL, DEFAULT_TASK_PANEL } from '@src/constants/view';

import type { EventView, TaskView, WeekOptions } from '@t/options';

export function getActivePanels(
  taskView: Required<WeekOptions>['taskView'],
  eventView: Required<WeekOptions>['eventView']
): (TaskView | EventView)[] {
  const activePanels: (TaskView | EventView)[] = [];

  if (taskView === true) {
    activePanels.push(...DEFAULT_TASK_PANEL);
  } else if (Array.isArray(taskView)) {
    activePanels.push(...taskView);
  }

  if (eventView === true) {
    activePanels.push(...DEFAULT_EVENT_PANEL);
  } else if (Array.isArray(eventView)) {
    activePanels.push(...eventView);
  }

  return activePanels;
}
