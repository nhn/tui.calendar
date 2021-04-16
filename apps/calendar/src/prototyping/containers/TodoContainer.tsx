import { h } from 'preact';
import { useStore } from '@src/prototyping/hooks/store';
import { useCallback } from 'preact/hooks';

import TodoList from '@src/prototyping/components/TodoList';

const TodoListContainer = () => {
  const { state, actions } = useStore('todos');
  const { insert, changeInput, toggleCheck, remove } = actions;
  const { input, todos } = state;

  const onChange = useCallback(
    (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        changeInput(e.target.value);
      }
    },
    [changeInput]
  );
  const onSubmit = useCallback(
    (e: Event) => {
      e.preventDefault();
      insert(input);
      changeInput('');
    },
    [insert, changeInput, input]
  );

  return (
    <TodoList
      input={input}
      todos={todos}
      onChange={onChange}
      onSubmit={onSubmit}
      onToggle={toggleCheck}
      onRemove={remove}
    />
  );
};

export default TodoListContainer;
