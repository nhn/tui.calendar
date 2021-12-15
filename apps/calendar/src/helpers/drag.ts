import { DraggingTypes } from '@t/drag';

export const DRAGGING_TYPE_CONSTANTS: { [K in DraggingTypes]: DraggingTypes } = {
  alldayGridRowSelection: 'alldayGridRowSelection',
  monthViewGridSelection: 'monthViewGridSelection',
  timeGridColumnSelection: 'timeGridColumnSelection',
};

export const DRAGGING_TYPE_CREATORS = {
  resizeEvent: (id: string) => `event/resize/${id}` as const,
  moveEvent: (id: string) => `event/move/${id}` as const,
};
