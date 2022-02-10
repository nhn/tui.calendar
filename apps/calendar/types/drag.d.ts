import type { GridSelectionSlice } from '@src/slices/gridSelection';

export type EventDraggingBehavior = 'move' | 'resize';

export type EventDragging<EventId extends string = any> =
  `event/${EventDraggingBehavior}/${EventId}`;

export type GridSelectionType = keyof GridSelectionSlice['gridSelection'];

export type GridSelectionDragging = `gridSelection/${GridSelectionType}`;

export type DraggingTypes<EventId extends string = any> =
  | GridSelectionDragging
  | EventDragging<EventId>
  | 'panelResizer';
