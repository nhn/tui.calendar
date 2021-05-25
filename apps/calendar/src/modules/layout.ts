import type { LayoutState } from '@t/store';

const layout = {
  name: 'layout',
  state: {} as LayoutState,
  actions: {
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
