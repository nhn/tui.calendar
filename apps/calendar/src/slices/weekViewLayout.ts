import produce from 'immer';

import { DEFAULT_RESIZER_LENGTH } from '@src/constants/layout';
import { DEFAULT_PANEL_HEIGHT } from '@src/constants/style';

import { CalendarStore, SetState } from '@t/store';

export type WeekGridRows = 'milestone' | 'task' | 'allday' | 'rest' | string;

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

function getRestPanelHeight(
  dayGridRowsState: WeekViewLayoutSlice['weekViewLayout']['dayGridRows'],
  initHeight: number
) {
  return Object.keys(dayGridRowsState).reduce((acc, rowName) => {
    if (rowName === 'rest') {
      return acc;
    }

    return acc - dayGridRowsState[rowName].height - DEFAULT_RESIZER_LENGTH;
  }, initHeight);
}

export function createWeekViewLayoutSlice(): WeekViewLayoutSlice {
  return {
    layout: 500,
    weekViewLayout: {
      dayGridRows: {
        rest: {
          height: 300,
        },
      },
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
          state.weekViewLayout.dayGridRows.rest.height = getRestPanelHeight(
            state.weekViewLayout.dayGridRows,
            height
          );
        })
      ),
    updateDayGridRowHeight: ({ rowName, height }: UpdateGridRowHeightParams) =>
      set(
        produce((state) => {
          state.weekViewLayout.dayGridRows[rowName] = { height };
          state.weekViewLayout.dayGridRows.rest.height = getRestPanelHeight(
            state.weekViewLayout.dayGridRows,
            state.layout
          );
        })
      ),
    updateDayGridRowHeightByDiff: ({ rowName, diff }: UpdateGridRowHeightByDiffParams) =>
      set(
        produce((state) => {
          const height =
            state.weekViewLayout.dayGridRows?.[rowName]?.height ?? DEFAULT_PANEL_HEIGHT;

          state.weekViewLayout.dayGridRows[rowName] = { height: height + diff };
          state.weekViewLayout.dayGridRows.rest.height = getRestPanelHeight(
            state.weekViewLayout.dayGridRows,
            state.layout
          );
        })
      ),
  };
}
