import produce from 'immer';

import { CalendarState, CalendarStore, SetState } from '@t/store';

export type GridSelectionSlice = {
  gridSelection: {
    dayGridMonth: GridSelectionData[] | [];
    dayGridWeek: [];
    timeGrid: [];
  };
};

export type GridSelectionDispatchers = {
  addGridSelection: (
    type: keyof GridSelectionSlice['gridSelection'],
    gridSelection: GridSelectionData | null
  ) => void;
  clearAll: () => void;
};

export function createGridSelectionSlice(): GridSelectionSlice {
  return {
    gridSelection: {
      dayGridMonth: [],
      dayGridWeek: [],
      timeGrid: [],
    },
  };
}

export function createGridSelectionDispatchers(
  set: SetState<CalendarStore>
): GridSelectionDispatchers {
  return {
    addGridSelection: (type, gridSelection) => {
      set(
        produce((state: CalendarState) => {
          if (type === 'dayGridMonth' && gridSelection) {
            state.gridSelection[type] = [...state.gridSelection[type], gridSelection];
          }
        })
      );
    },
    clearAll: () =>
      set(
        produce((state: CalendarState) => {
          state.gridSelection = createGridSelectionSlice().gridSelection;
        })
      ),
  };
}
