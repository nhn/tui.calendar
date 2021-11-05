import {
  createViewDispatchers,
  createViewSlice,
  ViewDispatchers,
  ViewSlice,
} from '@src/slices/view';
import { createStore } from '@src/store/internal';

import { InternalStoreAPI, StoreCreator } from '@t/store';

type ViewSliceStore = ViewSlice & ViewDispatchers;

describe('View Slice', () => {
  let store: InternalStoreAPI<ViewSliceStore>;
  const storeCreator: StoreCreator<ViewSlice & ViewDispatchers> = (set) => {
    return {
      ...createViewSlice(),
      ...createViewDispatchers(set as any),
    };
  };
  const getState = () => store.getState();

  beforeEach(() => {
    store = createStore(storeCreator);
  });

  it('should have default currentView value', () => {
    const { view } = getState();

    expect(view.currentView).toBe('month');
  });

  it('should be able to change currentView', () => {
    const targetView = 'day';
    const { changeView } = getState();

    changeView(targetView);

    expect(getState().view.currentView).toBe(targetView);
  });
});
