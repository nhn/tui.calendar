import produce from 'immer';

import { DEFAULT_DUPLICATE_EVENT_CID, DEFAULT_RESIZER_LENGTH } from '@src/constants/layout';
import { DEFAULT_PANEL_HEIGHT } from '@src/constants/style';

import type { CalendarState, CalendarStore, SetState } from '@t/store';

export type WeekGridRows = 'milestone' | 'task' | 'allday' | 'time' | string;

// @TODO: Change name to layout & merge slice into layout
export type WeekViewLayoutSlice = {
  layout: number;
  weekViewLayout: {
    lastPanelType: string | null;
    dayGridRows: {
      [row in WeekGridRows]: {
        height: number;
      };
    };
    selectedDuplicateEventCid: number;
  };
};

type UpdateGridRowHeightParams = { rowName: WeekGridRows; height: number };
type UpdateGridRowHeightByDiffParams = { rowName: WeekGridRows; diff: number };

export type WeekViewLayoutDispatchers = {
  setLastPanelType: (type: string | null) => void;
  updateLayoutHeight: (height: number) => void;
  updateDayGridRowHeight: (params: UpdateGridRowHeightParams) => void;
  updateDayGridRowHeightByDiff: (params: UpdateGridRowHeightByDiffParams) => void;
  setSelectedDuplicateEventCid: (cid?: number) => void;
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
    layout: 500,
    weekViewLayout: {
      lastPanelType: null,
      dayGridRows: {} as WeekViewLayoutSlice['weekViewLayout']['dayGridRows'],
      selectedDuplicateEventCid: DEFAULT_DUPLICATE_EVENT_CID,
    },
  };
}

export function createWeekViewLayoutDispatchers(
  set: SetState<CalendarStore>
): WeekViewLayoutDispatchers {
  return {
    setLastPanelType: (type) => {
      set(
        produce<CalendarState>((state) => {
          state.weekViewLayout.lastPanelType = type;

          if (type) {
            state.weekViewLayout.dayGridRows[type].height = getRestPanelHeight(
              state.weekViewLayout.dayGridRows,
              type,
              state.layout
            );
          }
        })
      );
    },
    updateLayoutHeight: (height) =>
      set(
        produce<CalendarState>((state) => {
          const { lastPanelType } = state.weekViewLayout;

          state.layout = height;
          if (lastPanelType) {
            state.weekViewLayout.dayGridRows[lastPanelType].height = getRestPanelHeight(
              state.weekViewLayout.dayGridRows,
              lastPanelType,
              height
            );
          }
        })
      ),
    updateDayGridRowHeight: ({ rowName, height }) =>
      set(
        produce<CalendarState>((state) => {
          const { lastPanelType } = state.weekViewLayout;

          state.weekViewLayout.dayGridRows[rowName] = { height };
          if (lastPanelType) {
            state.weekViewLayout.dayGridRows[lastPanelType].height = getRestPanelHeight(
              state.weekViewLayout.dayGridRows,
              lastPanelType,
              state.layout
            );
          }
        })
      ),
    updateDayGridRowHeightByDiff: ({ rowName, diff }) =>
      set(
        produce<CalendarState>((state) => {
          const { lastPanelType } = state.weekViewLayout;
          const height =
            state.weekViewLayout.dayGridRows?.[rowName]?.height ?? DEFAULT_PANEL_HEIGHT;

          state.weekViewLayout.dayGridRows[rowName] = { height: height + diff };
          if (lastPanelType) {
            state.weekViewLayout.dayGridRows[lastPanelType].height = getRestPanelHeight(
              state.weekViewLayout.dayGridRows,
              lastPanelType,
              state.layout
            );
          }
        })
      ),
    setSelectedDuplicateEventCid: (cid) =>
      set(
        produce<CalendarState>((state) => {
          state.weekViewLayout.selectedDuplicateEventCid = cid ?? DEFAULT_DUPLICATE_EVENT_CID;
        })
      ),
  };
}
