import { DraggingTypes, GridSelectionType } from '@t/drag';

export const DRAGGING_TYPE_CONSTANTS: { [K in DraggingTypes]: DraggingTypes } = {
  'gridSelection/dayGridMonth': 'gridSelection/dayGridMonth',
  'gridSelection/dayGridWeek': 'gridSelection/dayGridWeek',
  'gridSelection/timeGrid': 'gridSelection/timeGrid',
  panelResizer: 'panelResizer',
};

export const DRAGGING_TYPE_CREATORS = {
  resizeEvent: (id: string) => `event/resize/${id}` as const,
  moveEvent: (id: string) => `event/move/${id}` as const,
  gridSelection: (type: GridSelectionType) => `gridSelection/${type}` as const,
};
