import { DraggingTypes } from '@t/drag';

export const DRAGGING_TYPE_CONSTANTS: { [K in DraggingTypes]: DraggingTypes } = {
  alldayGridRowSelection: 'alldayGridRowSelection',
  timeGridColumnSelection: 'timeGridColumnSelection',
};

export const DRAGGING_TYPE_CREATORS = {
  hEventResizeWithId: (id: string) => `horizontalEventResize/${id}` as const,
};
