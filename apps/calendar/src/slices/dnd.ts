import produce from 'immer';

import EventUIModel from '@src/model/eventUIModel';

import { CalendarState, CalendarStore, SetState } from '@t/store';

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
    draggingEventUIModel: EventUIModel | null;
  };
}

export interface DndDispatchers {
  initDrag: (initState: Pick<DndSlice['dnd'], 'initX' | 'initY' | 'draggingItemType'>) => void;
  setDraggingState: (newState: Partial<Omit<DndSlice['dnd'], 'draggingState'>>) => void;
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
        produce((state) => {
          state.dnd = {
            ...state.dnd,
            ...initState,
            draggingState: DraggingState.INIT,
          };
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
    reset: () => {
      set(
        produce((state) => {
          state.dnd = createDndSlice().dnd;
        })
      );
    },
    setDraggingEventUIModel: (eventUIModel) => {
      set(
        produce((state: CalendarState) => {
          state.dnd.draggingEventUIModel = eventUIModel?.clone() ?? null;
        })
      );
    },
  };
}
