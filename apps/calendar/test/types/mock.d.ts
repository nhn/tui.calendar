type TodoItem = {
  id: number;
  text: string;
  done: boolean;
};

type TodosState = {
  input: string;
  todos: TodoItem[];
};

type CounterState = {
  number: number;
};
