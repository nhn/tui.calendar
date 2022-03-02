import { GridSelectionType } from '@src/slices/gridSelection';

import { DraggingTypes, EventDraggingArea } from '@t/drag';

export const DRAGGING_TYPE_CONSTANTS: { [K in DraggingTypes]: DraggingTypes } = {
  'gridSelection/dayGridMonth': 'gridSelection/dayGridMonth',
  'gridSelection/dayGridWeek': 'gridSelection/dayGridWeek',
  'gridSelection/timeGrid': 'gridSelection/timeGrid',
  panelResizer: 'panelResizer',
};

export const DRAGGING_TYPE_CREATORS = {
  resizeEvent: (area: EventDraggingArea, id: string) => `event/${area}/resize/${id}` as const,
  moveEvent: (area: EventDraggingArea, id: string) => `event/${area}/move/${id}` as const,
  gridSelection: (type: GridSelectionType) => `gridSelection/${type}` as const,
};
