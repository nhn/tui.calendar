import todos from './todos';
import counter from './counter';

export type Modules = {
  todos: typeof todos;
  counter: typeof counter;
};

export const modules = {
  todos,
  counter,
};
