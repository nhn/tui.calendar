import Store from '@src/store';
import { CalendarState, InitStoreData } from '@t/store';
import { counter, todos } from '@test/module/modules';

describe('Store', () => {
  let store: Store<CalendarState>;

  describe('Module', () => {
    it('should set state', () => {
      store = new Store({ modules: [todos, counter], initStoreData: { options: {} } });

      expect(store.state.counter.number).toEqual(0);
    });

    it('should set state with state function', () => {
      store = new Store({
        modules: [],
        initStoreData: { options: { month: { narrowWeekend: true } } },
      });
      store.setModule({
        name: 'options',
        state: ({ options }: InitStoreData) => ({
          month: { narrowWeekend: options.month?.narrowWeekend ?? false },
        }),
      });

      expect(store.state.options.month?.narrowWeekend).toBe(true);
    });
  });

  describe('Actions', () => {
    beforeEach(() => {
      store = new Store({
        modules: [],
        initStoreData: { options: { week: { narrowWeekend: true } } },
      });

      store.setModule(todos);
      store.setModule(counter);
    });

    it("should have all module's actions set in flattenActionMap", () => {
      expect(store.flattenActionMap).toHaveProperty('todos/toggleCheck');
      expect(store.flattenActionMap).toHaveProperty('todos/insert');
      expect(store.flattenActionMap).toHaveProperty('todos/remove');
      expect(store.flattenActionMap).toHaveProperty('todos/changeInput');
      expect(store.flattenActionMap).toHaveProperty('counter/increment');
      expect(store.flattenActionMap).toHaveProperty('counter/decrement');
    });

    it('should set actions', () => {
      expect(store.actions).toEqual({
        todos: {
          toggleCheck: expect.any(Function),
          insert: expect.any(Function),
          remove: expect.any(Function),
          changeInput: expect.any(Function),
        },
        counter: {
          increment: expect.any(Function),
          decrement: expect.any(Function),
        },
      });
    });

    it("should dispatch the module's actions", () => {
      store.dispatch('counter/increment');
      store.dispatch('counter/increment');
      store.dispatch('counter/increment');
      expect(store.state.counter.number).toBe(3);

      store.dispatch('counter/decrement');
      expect(store.state.counter.number).toBe(2);
    });

    it('should dispatch the action of another module in the action', () => {
      store.dispatch('todos/insert', 'text 1');

      expect(store.state.todos.todos[0]).toEqual({ id: 1, text: 'text 1', done: false });
      expect(store.state.counter.number).toBe(1);
    });
  });
});
