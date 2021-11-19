import { CalendarStore, SetState } from '@t/store';

export enum DraggingState {
  IDLE,
  DRAGGING,
  END_DRAG,
}

export interface DndSlice {
  dnd: {
    draggingItemType: string | null;
    draggingState: DraggingState;
    shouldReset: boolean;
    initX: number | null;
    initY: number | null;
    x: number | null;
    y: number | null;
  };
}

export interface DndDispatchers {
  setDraggingState: (newState: Partial<Omit<DndSlice['dnd'], 'draggingState'>>) => void;
  endDrag: () => void;
  reset: () => void;
}

export function createDndSlice(): DndSlice {
  return {
    dnd: {
      draggingItemType: null,
      draggingState: DraggingState.IDLE,
      shouldReset: false,
      initX: null,
      initY: null,
      x: null,
      y: null,
    },
  };
}

export function createDndDispatchers(set: SetState<CalendarStore>): DndDispatchers {
  return {
    setDraggingState: (newState) => {
      set((state) => ({
        dnd: {
          ...state.dnd,
          ...newState,
          draggingState: DraggingState.DRAGGING,
        },
      }));
    },
    endDrag: () => {
      set((state) => ({
        dnd: {
          ...state.dnd,
          draggingState: DraggingState.END_DRAG,
        },
      }));
    },
    reset: () => {
      set(createDndSlice);
    },
  };
}
