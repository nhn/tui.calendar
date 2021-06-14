import type { LayoutState } from '@t/store';

const initialLayout: LayoutState = {
  layout: {
    height: 500,
  },
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

const grid = {
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

export default grid;
