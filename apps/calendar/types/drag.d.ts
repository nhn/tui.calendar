export type EventDragging<EventId extends string = any> = `event/${'move' | 'resize'}/${EventId}`;

export type DraggingTypes<EventId extends string = any> =
  | 'alldayGridRowSelection'
  | 'timeGridColumnSelection'
  | EventDragging<EventId>;
