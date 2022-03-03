import { DraggingState } from '@src/slices/dnd';

import { CalendarState } from '@t/store';

export function isNotDraggingSelector(state: CalendarState) {
  return state.dnd.draggingState === DraggingState.IDLE;
}
