import Store from '@src/store/store';
import { CalendarState } from '@t/store';

let todoItemId = 0;

export const todos = {
  name: 'todos',
  state: {
    input: '',
    todos: [],
  },
  actions: {
    toggleCheck(state: TodosState, payload: number): TodosState {
      return {
        ...state,
        todos: state.todos.map((todo: TodoItem) =>
          todo.id === payload ? { ...todo, done: !todo.done } : todo
        ),
      };
    },
    insert(state: TodosState, payload: string, store: Store<CalendarState>): TodosState {
      todoItemId += 1;
      store.dispatch('counter/increment');

      return {
        ...state,
        todos: state.todos.concat({ id: todoItemId, text: payload, done: false }),
      };
    },
    remove(state: TodosState, payload: number, store: Store<CalendarState>): TodosState {
      store.dispatch('counter/decrement');

      return { ...state, todos: state.todos.filter(({ id }) => id !== payload) };
    },
    changeInput(state: TodosState, payload: string): TodosState {
      return {
        ...state,
        input: payload,
      };
    },
  },
};

export const counter = {
  name: 'counter',
  state: { number: 0 },
  actions: {
    increment(state: CounterState): CounterState {
      return { ...state, number: state.number + 1 };
    },
    decrement(state: CounterState): CounterState {
      return { ...state, number: state.number - 1 };
    },
  },
};

declare global {
  interface ModuleMap {
    todos: typeof todos;
    counter: typeof counter;
  }
}