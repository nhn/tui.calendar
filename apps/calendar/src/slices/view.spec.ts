import type { ViewDispatchers, ViewSlice } from '@src/slices/view';
import { createViewDispatchers, createViewSlice } from '@src/slices/view';
import { createStore } from '@src/store/internal';
import TZDate from '@src/time/date';
import { addDate } from '@src/time/datetime';

import type { InternalStoreAPI, StoreCreator } from '@t/store';

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
    // Given
    const { view } = getState();

    // When

    // Then
    expect(view.currentView).toBe('week');
  });

  it('should be able to change currentView', () => {
    // Given
    const targetView = 'day';
    const { changeView } = getState();

    // When
    changeView(targetView);

    // Then
    expect(getState().view.currentView).toBe(targetView);
  });

  it('should have default renderDate', () => {
    // Given
    const today = new TZDate();
    const {
      view: { renderDate },
    } = getState();

    // When

    // Then
    expect(renderDate).toBeSameDate(today);
  });

  it('should be able to set renderDate', () => {
    // Given
    const today = new TZDate();
    const newRenderDate = addDate(today, 1);
    const { setRenderDate } = getState();

    // When
    setRenderDate(newRenderDate);

    // Then
    expect(getState().view.renderDate).toBeSameDate(newRenderDate);
  });
});
