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
    x: number;
    y: number;
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
      x: 0,
      y: 0,
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
