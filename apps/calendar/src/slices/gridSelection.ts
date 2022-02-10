import produce from 'immer';

import { CalendarStore, SetState } from '@t/store';

export type GridSelectionSlice = {
  gridSelection: {
    dayGridMonth: GridSelectionData | null;
    dayGridWeek: GridSelectionData | null;
    timeGrid: GridSelectionData | null;
  };
};

export type GridSelectionDispatchers = {
  setGridSelection: (
    area: keyof GridSelectionSlice['gridSelection'],
    gridSelection: GridSelectionData | null
  ) => void;
  clearAll: () => void;
};

export function createGridSelectionSlice(): GridSelectionSlice {
  return {
    gridSelection: {
      dayGridMonth: null,
      dayGridWeek: null,
      timeGrid: null,
    },
  };
}

export function createGridSelectionDispatchers(
  set: SetState<CalendarStore>
): GridSelectionDispatchers {
  return {
    setGridSelection: (area, gridSelection) =>
      set(
        produce((state) => {
          state.gridSelection[area] = gridSelection;
        })
      ),
    clearAll: () =>
      set(
        produce((state) => {
          state.gridSelection = {
            dayGridMonth: null,
            dayGridWeek: null,
            timeGrid: null,
          };
        })
      ),
  };
}
