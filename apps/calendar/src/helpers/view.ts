import { DEFAULT_EVENT_PANEL, DEFAULT_TASK_PANEL } from '@src/constants/view';

import type { Options } from '@t/options';

export function getDisplayPanel(
  taskView: Required<Options>['taskView'],
  eventView: Required<Options>['eventView']
) {
  const displayPanel: string[] = [];

  if (taskView === true) {
    displayPanel.push(...DEFAULT_TASK_PANEL);
  } else if (Array.isArray(taskView)) {
    displayPanel.push(...taskView);
  }

  if (eventView === true) {
    displayPanel.push(...DEFAULT_EVENT_PANEL);
  } else if (Array.isArray(eventView)) {
    displayPanel.push(...eventView);
  }

  return displayPanel;
}
