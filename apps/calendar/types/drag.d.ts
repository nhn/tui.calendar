export type EventDraggingBehavior = 'move' | 'resize';

export type EventDragging<EventId extends string = any> =
  `event/${EventDraggingBehavior}/${EventId}`;

export type DraggingTypes<EventId extends string = any> =
  | 'alldayGridRowSelection'
  | 'monthViewGridSelection'
  | 'timeGridColumnSelection'
  | EventDragging<EventId>;
