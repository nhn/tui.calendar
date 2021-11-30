export type DraggingTypes<T extends string = any> =
  | 'alldayGridRowSelection'
  | 'timeGridColumnSelection'
  | `horizontalEventResize/${T}`;
