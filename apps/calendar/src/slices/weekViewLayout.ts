import { deepMergedCopy } from '@src/utils/object';

import { CalendarStore, SetState } from '@t/store';

export type WeekGridRows = 'milestone' | 'task' | 'allday';

export type WeekViewLayoutSlice = {
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
  updateDayGridRowHeight: (params: UpdateGridRowHeightParams) => void;
};

const DAYGRID_ROW_NAMES = ['milestone', 'task', 'allday'] as const;

export function createWeekViewLayoutSlice(): WeekViewLayoutSlice {
  return {
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
    updateDayGridRowHeight: ({ rowName, height }: UpdateGridRowHeightParams) =>
      set((state) => ({
        weekViewLayout: deepMergedCopy(state.weekViewLayout, {
          dayGridRows: {
            [rowName]: {
              height,
            },
          },
        }),
      })),
  };
}
