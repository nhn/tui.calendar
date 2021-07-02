import type { LayoutState } from '@t/store';

type UpdatePanelHeightParams = { type: string; height: number };

const initialLayout: LayoutState = {
  milestone: {
    height: 72,
  },
  task: {
    height: 72,
  },
  allday: {
    height: 72,
  },
};

export const grid = {
  name: 'grid',
  state: initialLayout,
  actions: {
    updatePanelHeight(state: LayoutState, { type, height }: UpdatePanelHeightParams) {
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
