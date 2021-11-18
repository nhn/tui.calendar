import { CalendarStore, SetState } from '@t/store';

export interface DndSlice {
  dnd: {
    draggingItemType: string | null;
    isDragging: boolean;
    isDragEnd: boolean;
    x: number;
    y: number;
  };
}

export interface DndDispatchers {
  setDraggingState: (itemType: string, newState: DndSlice) => void;
  reset: () => void;
}

export function createDndSlice(): DndSlice {
  return {
    dnd: {
      draggingItemType: null,
      isDragging: false,
      isDragEnd: false,
      x: 0,
      y: 0,
    },
  };
}

export function createDndDispatchers(set: SetState<CalendarStore>): DndDispatchers {
  return {
    setDraggingState: (itemType, newState) => {
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
