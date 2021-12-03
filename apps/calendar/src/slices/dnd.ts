import { CalendarStore, SetState } from '@t/store';

export enum DraggingState {
  IDLE,
  INIT,
  DRAGGING,
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
      set((state) => ({
        dnd: {
          ...state.dnd,
          draggingItemType,
          initX,
          initY,
          draggingState: DraggingState.INIT,
        },
      }));
    },
    setDraggingState: (newState) => {
      set((state) => ({
        dnd: {
          ...state.dnd,
          ...newState,
          draggingState: DraggingState.DRAGGING,
        },
      }));
    },
    reset: () => {
      set(createDndSlice);
    },
  };
}
