import produce from 'immer';

import type EventUIModel from '@src/model/eventUIModel';

import type { DraggingTypes } from '@t/drag';
import type { CalendarState, CalendarStore, SetState } from '@t/store';

export enum DraggingState {
  IDLE,
  INIT,
  DRAGGING,
  CANCELED,
}

export interface DndSlice {
  dnd: {
    draggingItemType: DraggingTypes | null;
    draggingState: DraggingState;
    initX: number | null;
    initY: number | null;
    x: number | null;
    y: number | null;
    draggingEventUIModel: EventUIModel | null;
  };
}

export interface DndDispatchers {
  initDrag: (initState: Pick<DndSlice['dnd'], 'initX' | 'initY' | 'draggingItemType'>) => void;
  setDragging: (newState: Partial<Omit<DndSlice['dnd'], 'draggingState'>>) => void;
  cancelDrag: () => void;
  reset: () => void;
  setDraggingEventUIModel: (eventUIModel: EventUIModel | null) => void;
}

export function createDndSlice(): DndSlice {
  return {
    dnd: {
      draggingItemType: null,
      draggingState: DraggingState.IDLE,
      initX: null,
      initY: null,
      x: null,
      y: null,
      draggingEventUIModel: null,
    },
  };
}

export function createDndDispatchers(set: SetState<CalendarStore>): DndDispatchers {
  return {
    initDrag: (initState) => {
      set(
        produce<CalendarState>((state) => {
          state.dnd = {
            ...state.dnd,
            ...initState,
            draggingState: DraggingState.INIT,
          };
        })
      );
    },
    setDragging: (newState) => {
      set(
        produce<CalendarState>((state) => {
          state.dnd = {
            ...state.dnd,
            ...newState,
            draggingState: DraggingState.DRAGGING,
          };
        })
      );
    },
    cancelDrag: () => {
      set(
        produce<CalendarState>((state) => {
          state.dnd = createDndSlice().dnd;
          state.dnd.draggingState = DraggingState.CANCELED;
        })
      );
    },
    reset: () => {
      set(
        produce<CalendarState>((state) => {
          state.dnd = createDndSlice().dnd;
        })
      );
    },
    setDraggingEventUIModel: (eventUIModel) => {
      set(
        produce<CalendarState>((state) => {
          state.dnd.draggingEventUIModel = eventUIModel?.clone() ?? null;
        })
      );
    },
  };
}
