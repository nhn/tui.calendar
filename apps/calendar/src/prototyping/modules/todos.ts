import { TodoState } from '@t/prototyping';

const TOAST_UI_CALENDAR_PREFIX = 'toastui-calendar-';

class IdGenerator {
  private prefix = '';

  private i = 0;

  constructor(prefix = '') {
    this.prefix = `${TOAST_UI_CALENDAR_PREFIX}${prefix}-`;
  }

  get id() {
    this.i += 1;

    return `${this.prefix}${this.i}`;
  }
}

const todoIdGenerator = new IdGenerator('todo');

const todos = {
  namespace: 'todos',
  state: () =>
    ({
      input: '',
      todos: [],
    } as TodoState),
  actions: {
    toggleCheck(state: TodoState, payload: string) {
      return {
        ...state,
        todos: state.todos.map((todo: TodoItem) =>
          todo.id === payload ? { ...todo, done: !todo.done } : todo
        ),
      };
    },
    insert(state: TodoState, payload: string) {
      return {
        ...state,
        todos: state.todos.concat({ id: todoIdGenerator.id, text: payload, done: false }),
      };
    },
    remove(state: TodoState, payload: string) {
      return { ...state, todos: state.todos.filter(({ id }) => id !== payload) };
    },
    changeInput(state: TodoState, payload: string) {
      return {
        ...state,
        input: payload,
      };
    },
  },
};

export default todos;
