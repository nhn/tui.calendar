import { Fragment, FunctionComponent, h } from 'preact';
import { memo } from 'preact/compat';
import { TodoItem as TodoItemType } from '@t/prototyping';

type TodoItemProps = {
  todo: TodoItemType;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
};

type TodoItemsProps = {
  todos: TodoItemType[];
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
};

type TodoListProps = {
  todos: TodoItemType[];
  input: string;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onChange: (e: Event) => void;
  onSubmit: (e: Event) => void;
};

const TodoItem: FunctionComponent<TodoItemProps> = memo(({ todo, onRemove, onToggle }) => {
  const { id, text, done } = todo;

  return (
    <li>
      <input type="checkbox" onChange={() => onToggle(id)} checked={done} />
      <span>{text}</span>{' '}
      <button style={{ marginLeft: '1px' }} onClick={() => onRemove(id)}>
        삭제
      </button>
    </li>
  );

  return null;
});

const TodoItems: FunctionComponent<TodoItemsProps> = memo(({ todos, onRemove, onToggle }) => {
  return (
    <Fragment>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </Fragment>
  );
});

const todoListStyle = {
  width: 500,
  border: '2px solid #cd2cd0',
  marginBottom: 20,
  padding: 10,
};

const TodoList: FunctionComponent<TodoListProps> = ({
  todos,
  input,
  onRemove,
  onToggle,
  onChange,
  onSubmit,
}) => {
  return (
    <div style={todoListStyle}>
      <h2>Todo List</h2>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={input} />
        <button type="submit">추가</button>
      </form>
      <ul>
        <TodoItems todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </ul>
    </div>
  );
};

export default TodoList;
