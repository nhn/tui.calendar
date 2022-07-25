import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { createStoreContext } from '@src/store/index';
import { createStore } from '@src/store/internal';
import { fireEvent, render, screen } from '@src/test/utils';

import type { InternalStoreAPI } from '@t/store';

describe('Using store and store context', () => {
  describe('Simple State', () => {
    type CounterStore = {
      count: number;
      increment: () => void;
      setCount: (n: number) => void;
    };

    let store: InternalStoreAPI<CounterStore>;
    const { StoreProvider, useStore, useInternalStore } = createStoreContext<CounterStore>();

    const Counter = () => {
      const count = useStore((state) => state.count);

      return <div>Current count is: {count}</div>;
    };
    const CounterButtons = () => {
      const [incCount, setCount] = useStore((state) => [state.increment, state.setCount]);

      return (
        <div>
          <button onClick={incCount}>+</button>
          <button onClick={() => setCount(0)}>reset</button>
        </div>
      );
    };

    beforeEach(() => {
      store = createStore((set) => ({
        count: 0,
        increment: () =>
          set(({ count }) => ({
            count: count + 1,
          })),
        setCount: (n: number) => set(() => ({ count: n })),
      }));
    });

    it('should inject store to components with Provider', () => {
      const { container } = render(
        <StoreProvider store={store}>
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
        const storeInternal = useInternalStore();
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
        <StoreProvider store={store}>
          <CounterMultiplier />
          <CounterButtons />
        </StoreProvider>
      );

      expect(container).toHaveTextContent(/x2 count: 0/i);

      fireEvent.click(screen.getByText('+'));
      expect(container).toHaveTextContent(/x2 count: 2/i);
    });
  });

  describe('Complex state', () => {
    type Store = {
      todo: {
        todos: { id: string; title: string; isDone: boolean }[];
        filter: 'all' | 'active' | 'done';
      };
      search: {
        todoSearchKeyword: string;
      };
      dispatch: {
        todo: {
          addTodo: (title: string) => void;
          changeTodoFilter: (filter: 'all' | 'active' | 'done') => void;
        };
        search: {
          changeTodoSearchKeyword: (keyword: string) => void;
        };
      };
    };

    let store: InternalStoreAPI<Store>;
    const { StoreProvider, useStore } = createStoreContext<Store>();

    const SearchInput = () => {
      const searchKeyword = useStore((state) => state.search.todoSearchKeyword);
      const handleChange = useStore((state) => state.dispatch.search.changeTodoSearchKeyword);

      return (
        <div>
          <span>Current search keyword: {searchKeyword}</span>
          <label htmlFor="search-keyword">
            Search:
            <input
              id="search-keyword"
              type="text"
              value={searchKeyword}
              onChange={(e) => handleChange(e.currentTarget.value ?? '')}
            />
          </label>
        </div>
      );
    };

    const Todos = () => {
      const todos = useStore((state) => state.todo.todos);

      return (
        <ul role="list">
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      );
    };

    beforeEach(() => {
      const todoNames = ['a', 'b', 'c', 'd'];
      store = createStore<Store>((set) => ({
        todo: {
          todos: todoNames.map((name) => ({
            title: name,
            id: `id-${name}`,
            isDone: name === 'd',
          })),
          filter: 'all',
        },
        search: {
          todoSearchKeyword: '',
        },
        dispatch: {
          todo: {
            addTodo: (title) =>
              set(({ todo }) => ({
                todo: {
                  ...todo,
                  todos: todo.todos.concat({ title, id: `id-${title}`, isDone: false }),
                },
              })),
            changeTodoFilter: (filter) =>
              set(({ todo }) => ({
                todo: {
                  ...todo,
                  filter,
                },
              })),
          },
          search: {
            changeTodoSearchKeyword: (keyword) =>
              set(({ search }) => ({
                search: {
                  ...search,
                  todoSearchKeyword: keyword,
                },
              })),
          },
        },
      }));
    });

    it('should not affect other states when modifying a certain scope of state', () => {
      render(
        <StoreProvider store={store}>
          <SearchInput />
          <Todos />
        </StoreProvider>
      );

      const input = screen.getByLabelText('Search:');
      const todolist = screen.getByRole('list');

      expect(todolist.children).toHaveLength(4);

      fireEvent.change(input, { target: { value: 'b' } });

      const searchResult = screen.getByText(/current search keyword:\sb/i);
      expect(searchResult).toBeInTheDocument();
      expect(todolist.children).toHaveLength(4);
    });

    it('should be able to create derived states with selectors', () => {
      const FilteredTodo = () => {
        const filteredTodos = useStore((state) => {
          const { todos, filter } = state.todo;
          const { todoSearchKeyword } = state.search;
          const filterBySearchKeyword = todoSearchKeyword
            ? (todo: Store['todo']['todos'][number]) => todo.title.startsWith(todoSearchKeyword)
            : Boolean;

          if (filter === 'all') {
            return todos.filter(filterBySearchKeyword);
          }

          return todos
            .filter((todo) => (filter === 'done' ? todo.isDone : !todo.isDone))
            .filter(filterBySearchKeyword);
        });

        return (
          <ul role="list">
            {filteredTodos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        );
      };
      const TodoFilter = () => {
        const changeFilter = useStore((state) => state.dispatch.todo.changeTodoFilter);

        return (
          <div>
            <button onClick={() => changeFilter('all')}>All</button>
            <button onClick={() => changeFilter('active')}>Active</button>
            <button onClick={() => changeFilter('done')}>Done</button>
          </div>
        );
      };

      render(
        <StoreProvider store={store}>
          <FilteredTodo />
          <TodoFilter />
        </StoreProvider>
      );

      const getTodoList = () => screen.getByRole('list');
      const changeFilter = (filter: 'All' | 'Active' | 'Done') =>
        fireEvent.click(screen.getByText(filter));

      expect(getTodoList().children).toHaveLength(4);

      changeFilter('Active');
      expect(getTodoList().children).toHaveLength(3);

      changeFilter('Done');
      expect(getTodoList().children).toHaveLength(1);
    });
  });
});
