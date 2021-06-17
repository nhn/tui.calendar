import type { LayoutState } from '@t/store';

const initialLayout: LayoutState = {
  milestone: {
    height: 72,
  },
  allday: {
    height: 72,
  },
  task: {
    height: 72,
  },
};

export const grid = {
  name: 'grid',
  state: initialLayout,
  actions: {
    updateLayoutHeight(state: LayoutState, { height }: { height: number }) {
      return { ...state, layout: { ...state.layout, height } };
    },
    updatePanelHeight(state: LayoutState, { type, height }: { type: string; height: number }) {
      return {
        ...state,
        [type]: {
          ...state[type],
          height,
        },
      };
    },
  },
};
