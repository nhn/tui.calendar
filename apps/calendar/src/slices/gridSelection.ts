import produce from 'immer';

import type { GridSelectionData } from '@t/components/gridSelection';
import type { CalendarState, CalendarStore, SetState } from '@t/store';

export type GridSelectionSlice = {
  gridSelection: {
    dayGridMonth: GridSelectionData | null;
    dayGridWeek: GridSelectionData | null;
    timeGrid: GridSelectionData | null;
    accumulated: {
      dayGridMonth: GridSelectionData[] | [];
    };
  };
};

export type GridSelectionType = Exclude<keyof GridSelectionSlice['gridSelection'], 'accumulated'>;

export type GridSelectionDispatchers = {
  setGridSelection: (type: GridSelectionType, gridSelection: GridSelectionData | null) => void;
  addGridSelection: (type: GridSelectionType, gridSelection: GridSelectionData | null) => void;
  clearAll: () => void;
};

export function createGridSelectionSlice(): GridSelectionSlice {
  return {
    gridSelection: {
      dayGridMonth: null,
      dayGridWeek: null,
      timeGrid: null,
      accumulated: {
        dayGridMonth: [],
      },
    },
  };
}

export function createGridSelectionDispatchers(
  set: SetState<CalendarStore>
): GridSelectionDispatchers {
  return {
    setGridSelection: (type, gridSelection) => {
      set(
        produce<CalendarState>((state) => {
          state.gridSelection[type] = gridSelection;
        })
      );
    },
    addGridSelection: (type, gridSelection) => {
      set(
        produce<CalendarState>((state) => {
          if (type === 'dayGridMonth' && gridSelection) {
            state.gridSelection.accumulated[type] = [
              ...state.gridSelection.accumulated[type],
              gridSelection,
            ];
            state.gridSelection.dayGridMonth = null;
          }
        })
      );
    },
    clearAll: () =>
      set(
        produce<CalendarState>((state) => {
          state.gridSelection = createGridSelectionSlice().gridSelection;
        })
      ),
  };
}
