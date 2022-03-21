import produce from 'immer';

import { DEFAULT_RESIZER_LENGTH, DEFAULT_WEEK_PANEL_TYPES } from '@src/constants/layout';
import { DEFAULT_PANEL_HEIGHT } from '@src/constants/style';

import { CalendarStore, SetState } from '@t/store';

export type WeekGridRows = 'milestone' | 'task' | 'allday' | string;

// @TODO: Change name to layout & merge slice into layout
export type WeekViewLayoutSlice = {
  lastPanelType: string | null;
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
  setLastPanelType: (type: string | null) => void;
  updateLayoutHeight: (height: number) => void;
  updateDayGridRowHeight: (params: UpdateGridRowHeightParams) => void;
  updateDayGridRowHeightByDiff: (params: UpdateGridRowHeightByDiffParams) => void;
};

function getRestPanelHeight(
  dayGridRowsState: WeekViewLayoutSlice['weekViewLayout']['dayGridRows'],
  lastPanelType: string,
  initHeight: number
) {
  return Object.keys(dayGridRowsState).reduce((acc, rowName) => {
    if (rowName === lastPanelType) {
      return acc;
    }

    return acc - dayGridRowsState[rowName].height - DEFAULT_RESIZER_LENGTH;
  }, initHeight);
}

export function createWeekViewLayoutSlice(): WeekViewLayoutSlice {
  return {
    lastPanelType: null,
    layout: 500,
    weekViewLayout: {
      dayGridRows: DEFAULT_WEEK_PANEL_TYPES.reduce((acc, rowName) => {
        acc[rowName] = {
          height: DEFAULT_PANEL_HEIGHT,
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
    setLastPanelType: (type) => {
      set(
        produce((state) => {
          state.lastPanelType = type;

          if (type) {
            state.weekViewLayout.dayGridRows[type].height = getRestPanelHeight(
              state.weekViewLayout.dayGridRows,
              state.lastPanelType,
              state.layout
            );
          }
        })
      );
    },
    updateLayoutHeight: (height) =>
      set(
        produce((state) => {
          const { lastPanelType } = state;

          state.layout = height;
          if (lastPanelType) {
            state.weekViewLayout.dayGridRows[lastPanelType].height = getRestPanelHeight(
              state.weekViewLayout.dayGridRows,
              state.lastPanelType,
              height
            );
          }
        })
      ),
    updateDayGridRowHeight: ({ rowName, height }) =>
      set(
        produce((state) => {
          const { lastPanelType } = state;

          state.weekViewLayout.dayGridRows[rowName] = { height };
          if (lastPanelType) {
            state.weekViewLayout.dayGridRows[lastPanelType].height = getRestPanelHeight(
              state.weekViewLayout.dayGridRows,
              state.lastPanelType,
              state.layout
            );
          }
        })
      ),
    updateDayGridRowHeightByDiff: ({ rowName, diff }) =>
      set(
        produce((state) => {
          const { lastPanelType } = state;
          const height =
            state.weekViewLayout.dayGridRows?.[rowName]?.height ?? DEFAULT_PANEL_HEIGHT;

          state.weekViewLayout.dayGridRows[rowName] = { height: height + diff };
          if (lastPanelType) {
            state.weekViewLayout.dayGridRows[lastPanelType].height = getRestPanelHeight(
              state.weekViewLayout.dayGridRows,
              state.lastPanelType,
              state.layout
            );
          }
        })
      ),
  };
}
