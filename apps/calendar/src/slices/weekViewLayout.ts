import produce from 'immer';

import { CalendarStore, SetState } from '@t/store';

export type WeekGridRows = 'milestone' | 'task' | 'allday' | 'rest';

export type WeekViewLayoutSlice = {
  layout: number;
  weekViewLayout: {
    dayGridRows: {
      [row in WeekGridRows]: {
        height: number;
      };
    };
  };
};

type UpdateGridRowHeightParams = { rowName: WeekGridRows; height: number };

export type WeekViewLayoutDispatchers = {
  updateLayoutHeight: (height: number) => void;
  updateDayGridRowHeight: (params: UpdateGridRowHeightParams) => void;
};

const DAYGRID_ROW_NAMES = ['milestone', 'task', 'allday'] as const;

export function createWeekViewLayoutSlice(): WeekViewLayoutSlice {
  return {
    layout: 500,
    weekViewLayout: {
      dayGridRows: DAYGRID_ROW_NAMES.reduce((acc, rowName) => {
        acc[rowName] = {
          height: 72,
        };

        return acc;
      }, {} as WeekViewLayoutSlice['weekViewLayout']['dayGridRows']),
    },
  };
}

export function createWeekViewLayoutDispatchers(
  set: SetState<CalendarStore>
): WeekViewLayoutDispatchers {
  return {
    updateLayoutHeight: (height: number) =>
      set(
        produce((state) => {
          state.layout = height;
        })
      ),
    updateDayGridRowHeight: ({ rowName, height }: UpdateGridRowHeightParams) =>
      set(
        produce((state) => {
          state.weekViewLayout.dayGridRows[rowName].height = height;
        })
      ),
  };
}
