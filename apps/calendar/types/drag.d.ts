import type { GridSelectionSlice } from '@src/slices/gridSelection';

export type EventDraggingArea = 'dayGrid' | 'timeGrid';

export type EventDraggingBehavior = 'move' | 'resize';

export type EventDragging<EventId extends string = any> =
  `event/${EventDraggingArea}/${EventDraggingBehavior}/${EventId}`;

export type GridSelectionType = keyof GridSelectionSlice['gridSelection'];

export type GridSelectionDragging = `gridSelection/${GridSelectionType}`;

export type DraggingTypes<EventId extends string = any> =
  | GridSelectionDragging
  | EventDragging<EventId>
  | 'panelResizer';
