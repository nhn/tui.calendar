import { FunctionComponent, h } from 'preact';
import Store from '@src/store';
import { CalendarState } from '@t/store';
import { renderHook, act } from '@testing-library/preact-hooks';
import StoreProvider from '@src/components/provider';
import { useCalendarState, useStore, useActions } from '@src/components/hooks/store';
import { counter, todos } from '@test/module/modules';

function getStoreWrapper(store: Store): FunctionComponent {
  return function wrapper({ children }) {
    return <StoreProvider store={store}>{children}</StoreProvider>;
  };
}

describe('Store Provider', () => {
  let store: Store<CalendarState>;
  describe('useCreateStore', () => {
    beforeEach(() => {
      store = new Store({
        modules: [todos, counter],
        initStoreData: { options: {} },
      });
    });

    it('should return initial state', () => {
      const { result } = renderHook(() => useCalendarState(store));

      expect(result.current).toEqual({
        todos: { todos: [], input: '' },
        counter: { number: 0 },
      });
    });

    it('should set stateUpdater for Store', () => {
      expect(store.stateUpdater).toBeNull();

      renderHook(() => useCalendarState(store));

      expect(store.stateUpdater).toBeDefined();
    });
  });

  describe('useStore', () => {
    let wrapper: FunctionComponent;
    beforeEach(() => {
      store = new Store({
        modules: [todos, counter],
        initStoreData: { options: {} },
      });

      wrapper = getStoreWrapper(store);
    });

    it('useStore()', () => {
      const { result } = renderHook(() => useStore(), { wrapper });

      if (!result.current) {
        return;
      }

      expect(result.current.state).toEqual({
        todos: { todos: [], input: '' },
        counter: { number: 0 },
      });
    });

    it(`useStore(['counter'])`, () => {
      const { result } = renderHook(() => useStore(['counter']), { wrapper });

      if (!result.current) {
        return;
      }

      expect(result.current.state).toEqual({
        counter: { number: 0 },
      });
    });

    it(`useStore('todos')`, () => {
      const { result } = renderHook(() => useStore('todos'), { wrapper });

      if (!result.current) {
        return;
      }

      expect(result.current.state).toEqual({
        todos: [],
        input: '',
      });

      act(() => {
        result.current?.actions.insert('todo 1');
      });

      expect(result.current.state.todos[0]).toEqual({
        id: 1,
        text: 'todo 1',
        done: false,
      });

      act(() => {
        result.current?.actions.toggleCheck(1);
      });

      expect(result.current.state.todos[0].done).toBeTruthy();

      act(() => {
        result.current?.actions.remove(1);
      });

      expect(result.current.state.todos.length).toBe(0);
    });
  });

  describe('useActions', () => {
    let wrapper: FunctionComponent;

    beforeEach(() => {
      store = new Store({
        modules: [todos, counter],
        initStoreData: { options: {} },
      });

      wrapper = getStoreWrapper(store);
    });

    it('useActions()', () => {
      const { result } = renderHook(() => useActions(), { wrapper });

      expect(result.current).toEqual({
        todos: {
          toggleCheck: expect.any(Function),
          insert: expect.any(Function),
          remove: expect.any(Function),
          changeInput: expect.any(Function),
        },
        counter: { increment: expect.any(Function), decrement: expect.any(Function) },
      });
    });

    it(`useActions(['counter'])`, () => {
      const { result } = renderHook(() => useActions(['counter']), { wrapper });

      expect(result.current).toEqual({
        counter: { increment: expect.any(Function), decrement: expect.any(Function) },
      });
    });

    it(`useActions('todos')`, () => {
      const { result } = renderHook(() => useActions('todos'), { wrapper });

      expect(result.current).toEqual({
        toggleCheck: expect.any(Function),
        insert: expect.any(Function),
        remove: expect.any(Function),
        changeInput: expect.any(Function),
      });
    });
  });
});
