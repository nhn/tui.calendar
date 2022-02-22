import { DraggingState } from '@src/slices/dnd';

import { CalendarState } from '@t/store';

export function isDraggingSelector(state: CalendarState) {
  return state.dnd.draggingState > DraggingState.INIT;
}

export function draggingEventUIModelSelector(state: CalendarState) {
  return state.dnd.draggingEventUIModel;
}
