import { DraggingTypes } from '@t/drag';

export const DRAGGING_TYPE_CONSTANTS: { [K in DraggingTypes]: DraggingTypes } = {
  dayGridSelection: 'dayGridSelection',
  timeGridColumnSelection: 'timeGridColumnSelection',
  panelResizer: 'panelResizer',
};

export const DRAGGING_TYPE_CREATORS = {
  resizeEvent: (id: string) => `event/resize/${id}` as const,
  moveEvent: (id: string) => `event/move/${id}` as const,
};
