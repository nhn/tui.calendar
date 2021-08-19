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

type UpdateGridRowHeightParams = { rowName: WeekGridRows; height: number };

export type WeekViewLayoutDispatchers = {
  updateDayGridRowHeight: (params: UpdateGridRowHeightParams) => void;
};

export function createWeekViewLayoutDispatchers(
  set: SetState<CalendarStore>
): WeekViewLayoutDispatchers {
  return {
    updateDayGridRowHeight: ({ rowName, height }: UpdateGridRowHeightParams) =>
      set((state) => ({
        weekViewLayout: {
          ...state.weekViewLayout,
          dayGridRows: {
            ...state.weekViewLayout.dayGridRows,
            [rowName]: {
              height,
            },
          },
        },
      })),
  };
}
