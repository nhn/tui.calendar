import produce from 'immer';

import { CalendarStore, SetState } from '@t/store';

export enum DraggingState {
  IDLE,
  INIT,
  DRAGGING,
  END_DRAG,
}

export interface DndSlice {
  dnd: {
    draggingItemType: string | null;
    draggingState: DraggingState;
    initX: number | null;
    initY: number | null;
    x: number | null;
    y: number | null;
  };
}

export interface DndDispatchers {
  initDrag: (initState: Pick<DndSlice['dnd'], 'initX' | 'initY' | 'draggingItemType'>) => void;
  setDraggingState: (newState: Partial<Omit<DndSlice['dnd'], 'draggingState'>>) => void;
  endDrag: () => void;
  reset: () => void;
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
    },
  };
}

export function createDndDispatchers(set: SetState<CalendarStore>): DndDispatchers {
  return {
    initDrag: ({ draggingItemType, initX, initY }) => {
      set(
        produce((state) => {
          state.dnd.draggingItemType = draggingItemType;
          state.dnd.initX = initX;
          state.dnd.initY = initY;
          state.dnd.draggingState = DraggingState.INIT;
        })
      );
    },
    setDraggingState: (newState) => {
      set(
        produce((state) => {
          state.dnd = {
            ...state.dnd,
            ...newState,
            draggingState: DraggingState.DRAGGING,
          };
        })
      );
    },
    endDrag: () => {
      set(
        produce((state) => {
          state.dnd.draggingState = DraggingState.END_DRAG;
        })
      );
    },
    reset: () => {
      set(
        produce((state) => {
          state.dnd.draggingItemType = null;
          state.dnd.draggingState = DraggingState.IDLE;
          state.dnd.initX = null;
          state.dnd.initY = null;
          state.dnd.x = null;
          state.dnd.y = null;
        })
      );
    },
  };
}
