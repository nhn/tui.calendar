import { createStoreHook } from '@src/store/hook';

import { UseStore } from '@t/store';
import { act, renderHook } from '@testing-library/preact-hooks';

describe('createStoreHook', () => {
  describe('Simple state', () => {
    type CounterStore = {
      count: number;
      increment: () => void;
      setCount: (n: number) => void;
    };
    let useStore: UseStore<CounterStore>;

    beforeEach(() => {
      const { useStore: _useStore } = createStoreHook<CounterStore>((set) => ({
        count: 0,
        increment: () =>
          set(({ count }) => ({
            count: count + 1,
          })),
        setCount: (n: number) => set(() => ({ count: n })),
      }));
      useStore = _useStore;
    });

    it('should be able to initialize store', () => {
      const { result } = renderHook(() => useStore());

      expect(result.current).toMatchInlineSnapshot(`
        Object {
          "count": 0,
          "increment": [Function],
          "setCount": [Function],
        }
      `);
    });

    it('should be able to update states through actions by both function and object', () => {
      const { result } = renderHook(() => useStore());

      act(() => {
        result.current?.increment();
      });
      expect(result.current?.count).toBe(1);

      act(() => {
        result.current?.setCount(10);
      });
      expect(result.current?.count).toBe(10);
    });

    it('should slice state with selector', () => {
      const { result } = renderHook(() => useStore((state) => state.count));

      expect(typeof result.current === 'number').toBe(true);
    });

    it('should apply custom equality checker', () => {
      const { result } = renderHook(() =>
        useStore(
          (state) => state,
          (currentState, nextState) => currentState.count === 0 && nextState.count > 0 // so basically it never updates
        )
      );

      act(() => {
        result.current?.increment();
        result.current?.increment();
      });
      expect(result.current?.count).toBe(0);
    });
  });

  describe('More complex state', () => {
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

    let useStore: UseStore<Store>;

    beforeEach(() => {
      const todoNames = ['a', 'b', 'c', 'd'];

      const { useStore: _useStore } = createStoreHook<Store>((set) => ({
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
      useStore = _useStore;
    });

    it('should not affect other states when modifying a certain scope of state', () => {
      const { result: allState } = renderHook(() => useStore());
      expect(allState.current).toMatchInlineSnapshot(`
        Object {
          "dispatch": Object {
            "search": Object {
              "changeTodoSearchKeyword": [Function],
            },
            "todo": Object {
              "addTodo": [Function],
              "changeTodoFilter": [Function],
            },
          },
          "search": Object {
            "todoSearchKeyword": "",
          },
          "todo": Object {
            "filter": "all",
            "todos": Array [
              Object {
                "id": "id-a",
                "isDone": false,
                "title": "a",
              },
              Object {
                "id": "id-b",
                "isDone": false,
                "title": "b",
              },
              Object {
                "id": "id-c",
                "isDone": false,
                "title": "c",
              },
              Object {
                "id": "id-d",
                "isDone": true,
                "title": "d",
              },
            ],
          },
        }
      `);

      const { result: todoSlice } = renderHook(() => useStore((state) => state.todo));
      act(() => {
        allState.current?.dispatch.search.changeTodoSearchKeyword('b');
      });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(todoSlice.current).toMatchObject<Store['todo']>(allState.current!.todo);
    });

    it('should be able to create derived states through custom hooks', () => {
      function useFilteredTodo() {
        // it's recommended to move a selector to the outside of the custom hook for production.
        return useStore((state) => {
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
      }

      const { result: dispatchers } = renderHook(() => useStore((state) => state.dispatch));
      const { result: filteredTodos } = renderHook(() => useFilteredTodo());

      act(() => {
        dispatchers.current?.todo.changeTodoFilter('done');
      });
      expect(filteredTodos.current).toHaveLength(1);

      act(() => {
        dispatchers.current?.todo.changeTodoFilter('active');
      });
      expect(filteredTodos.current).toHaveLength(3);

      act(() => {
        dispatchers.current?.todo.changeTodoFilter('all');
        dispatchers.current?.search.changeTodoSearchKeyword('a');
      });
      expect(filteredTodos.current).toHaveLength(1);
    });
  });
});
