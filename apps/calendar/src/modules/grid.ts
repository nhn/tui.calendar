import type { LayoutState } from '@t/store';

type PanelType = 'milestone' | 'task' | 'allday';

type GridLayoutState = LayoutState<PanelType>;

const initialLayout: GridLayoutState = {
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
    updatePanelHeight(
      state: GridLayoutState,
      { type, height }: { type: PanelType; height: number }
    ) {
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
