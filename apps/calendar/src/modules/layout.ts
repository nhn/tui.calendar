import type { LayoutState } from '@t/store';

const layout = {
  name: 'layout',
  state: {} as LayoutState,
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

export default layout;
