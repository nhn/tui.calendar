import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { createStoreContext } from '@src/store/context';
import { createStoreHook } from '@src/store/hook';

import { fireEvent, render, screen } from '@testing-library/preact';

describe('createStoreContext', () => {
  type CounterStore = {
    count: number;
    incCount: () => void;
    setCount: (value: number) => void;
  };
  const {
    Provider: StoreProvider,
    useStore,
    useStoreInternal,
  } = createStoreContext<CounterStore>();
  const storeCreator = () =>
    createStoreHook<CounterStore>((set) => ({
      count: 0,
      incCount: () => set((state) => ({ ...state, count: state.count + 1 })),
      setCount: (value: number) => set((state) => ({ ...state, count: value })),
    }));
  const Counter = () => {
    const count = useStore((state) => state.count);

    return <div>Current count is: {count}</div>;
  };
  const CounterButtons = () => {
    const [incCount, setCount] = useStore((state) => [state.incCount, state.setCount]);

    return (
      <div>
        <button onClick={incCount}>+</button>
        <button onClick={() => setCount(0)}>reset</button>
      </div>
    );
  };

  it('should inject store to components with Provider', () => {
    const { container } = render(
      <StoreProvider storeCreator={storeCreator}>
        <Counter />
        <CounterButtons />
      </StoreProvider>
    );

    expect(container).toHaveTextContent(/current count is: 0/i);

    fireEvent.click(screen.getByText('+'));
    expect(container).toHaveTextContent(/current count is: 1/i);

    fireEvent.click(screen.getByText('reset'));
    expect(container).toHaveTextContent(/current count is: 0/i);
  });

  it('should access store internal by `useStoreInternal`', () => {
    const CounterMultiplier = () => {
      const storeInternal = useStoreInternal();
      const [multipliedCounter, setMultipliedCounter] = useState(0);

      useEffect(
        () =>
          storeInternal.subscribe(
            (newCounter: number) => setMultipliedCounter(newCounter * 2),
            (state) => state.count
          ),
        [storeInternal]
      );

      return <div>x2 count: {multipliedCounter}</div>;
    };

    const { container } = render(
      <StoreProvider storeCreator={storeCreator}>
        <CounterMultiplier />
        <CounterButtons />
      </StoreProvider>
    );

    expect(container).toHaveTextContent(/x2 count: 0/i);

    fireEvent.click(screen.getByText('+'));
    expect(container).toHaveTextContent(/x2 count: 2/i);
  });
});
