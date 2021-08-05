import { _CalendarState, SetState } from '@t/store';

type WeekGridRows = 'milestone' | 'task' | 'allday';

export type WeekViewLayoutSlice = {
  dayGridRows: {
    [row in WeekGridRows]: {
      height: number;
    };
  };
};

const DAYGRID_ROW_NAMES = ['milestone', 'task', 'allday'] as const;

export function createWeekViewLayoutSlice(): WeekViewLayoutSlice {
  return {
    dayGridRows: DAYGRID_ROW_NAMES.reduce((acc, rowName) => {
      acc[rowName] = {
        height: 72,
      };

      return acc;
    }, {} as WeekViewLayoutSlice['dayGridRows']),
  };
}

type UpdateGridRowHeightParams = { rowName: WeekGridRows; height: number };

export type WeekViewLayoutDispatchers = {
  updateGridRowHeight: (params: UpdateGridRowHeightParams) => void;
};

export function createWeekViewLayoutDispatchers(
  set: SetState<_CalendarState>
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
