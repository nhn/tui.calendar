import { CalendarStore, SetState } from '@t/store';

type WeekGridRows = 'milestone' | 'task' | 'allday';

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
  updateGridRowHeight: (params: UpdateGridRowHeightParams) => void;
};

export function createWeekViewLayoutDispatchers(
  set: SetState<CalendarStore>
): WeekViewLayoutDispatchers {
  return {
    updateGridRowHeight: ({ rowName, height }: UpdateGridRowHeightParams) =>
      set((state) => ({
        weekViewLayout: {
          ...state.weekViewLayout,
          [rowName]: {
            height,
          },
        },
      })),
  };
}
