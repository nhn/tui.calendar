import produce from 'immer';

import { isFunction } from '@src/utils/type';

import { CalendarState, CalendarStore, SetState } from '@t/store';

export type GridSelectionSlice = {
  gridSelection: {
    dayGridMonth: GridSelectionData | null;
    dayGridWeek: GridSelectionData | null;
    timeGrid: GridSelectionData | null;
  };
};

export type GridSelectionDispatchers = {
  setGridSelection: (
    type: keyof GridSelectionSlice['gridSelection'],
    gridSelection:
      | GridSelectionData
      | null
      | ((prev: GridSelectionData | null) => GridSelectionData | null)
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
    setGridSelection: (type, gridSelection) => {
      set(
        produce((state: CalendarState) => {
          state.gridSelection[type] = isFunction(gridSelection)
            ? gridSelection(state.gridSelection[type])
            : gridSelection;
        })
      );
    },
    clearAll: () =>
      set(
        produce((state: CalendarState) => {
          state.gridSelection = {
            dayGridMonth: null,
            dayGridWeek: null,
            timeGrid: null,
          };
        })
      ),
  };
}
