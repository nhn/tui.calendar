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
type UpdateGridRowHeightByDiffParams = { rowName: WeekGridRows; diff: number };

export type WeekViewLayoutDispatchers = {
  updateLayoutHeight: (height: number) => void;
  updateDayGridRowHeight: (params: UpdateGridRowHeightParams) => void;
  updateDayGridRowHeightByDiff: (params: UpdateGridRowHeightByDiffParams) => void;
};

const DAYGRID_ROW_NAMES = ['milestone', 'task', 'allday'] as const;

export function createWeekViewLayoutSlice(): WeekViewLayoutSlice {
  return {
    layout: 500,
    weekViewLayout: {
      dayGridRows: DAYGRID_ROW_NAMES.reduce(
        (acc, rowName) => {
          acc[rowName] = {
            height: 72,
          };

          return acc;
        },
        { rest: { height: 284 } } as WeekViewLayoutSlice['weekViewLayout']['dayGridRows']
      ),
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
          state.weekViewLayout.dayGridRows.rest.height = DAYGRID_ROW_NAMES.reduce(
            (acc, rowName) => acc - state.weekViewLayout.dayGridRows[rowName].height,
            height
          );
        })
      ),
    updateDayGridRowHeight: ({ rowName, height }: UpdateGridRowHeightParams) =>
      set(
        produce((state) => {
          state.weekViewLayout.dayGridRows[rowName].height = height;
          state.weekViewLayout.dayGridRows.rest.height = DAYGRID_ROW_NAMES.reduce(
            (acc, name) => acc - state.weekViewLayout.dayGridRows[name].height,
            state.layout
          );
        })
      ),
    updateDayGridRowHeightByDiff: ({ rowName, diff }: UpdateGridRowHeightByDiffParams) =>
      set(
        produce((state) => {
          state.weekViewLayout.dayGridRows[rowName].height += diff;
          state.weekViewLayout.dayGridRows.rest.height = DAYGRID_ROW_NAMES.reduce(
            (acc, name) => acc - state.weekViewLayout.dayGridRows[name].height,
            state.layout
          );
        })
      ),
  };
}
