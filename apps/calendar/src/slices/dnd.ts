import { CalendarStore, SetState } from '@t/store';

export interface DndSlice {
  dnd: {
    draggingItemType: string | null;
    isDragging: boolean;
    isDragEnd: boolean;
    shouldReset: boolean;
    x: number;
    y: number;
  };
}

export interface DndDispatchers {
  setDraggingState: (newState: Partial<DndSlice['dnd']>) => void;
  reset: () => void;
}

export function createDndSlice(): DndSlice {
  return {
    dnd: {
      draggingItemType: null,
      isDragging: false,
      isDragEnd: false,
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
        },
      }));
    },
    reset: () => {
      set(createDndSlice);
    },
  };
}
