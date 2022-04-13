import type { GridSelectionType } from '@src/slices/gridSelection';

import type { DraggingTypes, EventDraggingArea } from '@t/drag';

export const DRAGGING_TYPE_CONSTANTS: {
  [K in Extract<DraggingTypes, 'panelResizer'>]: DraggingTypes;
} = {
  panelResizer: 'panelResizer',
};

export const DRAGGING_TYPE_CREATORS = {
  resizeEvent: (area: EventDraggingArea, id: string) => `event/${area}/resize/${id}` as const,
  moveEvent: (area: EventDraggingArea, id: string) => `event/${area}/move/${id}` as const,
  gridSelection: (type: GridSelectionType) => `gridSelection/${type}` as const,
};
