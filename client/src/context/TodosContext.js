import { createContext, useEffect } from "react";
import { useReducerAsync } from "use-reducer-async";
import axios from "axios";

export const TodosContext = createContext({
  todos: [],
  currentTodo: {},
  isPending: false,
  error: null,
  initiliazeTodos: () => {},
  editTodo: () => {}
});

const todosReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_TODOS":
      return {
        ...state,
        todos: [...action.payload]
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case "SET_CURRENT_TODO":
      return {
        ...state,
        currentTodo: action.payload
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: [...state.todos.filter((t) => t.id !== action.payload)]
      };
    case "EDIT_TODO":
      let newTodos = state.todos;
      let todoIndex = newTodos.findIndex((t) => t.id == action.payload.id);
      newTodos[todoIndex] = {
        ...newTodos[todoIndex],
        title: action.payload.title,
        image: action.payload.image,
        completed: action.payload.completed
      };
      return {
        ...state,
        todos: [...newTodos]
      };
    case "SET_PENDING":
      return {
        ...state,
        isPending: action.payload
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

const asyncActionHandlers = {
  FETCH_TODO_FROM_DB:
    ({ dispatch, getState, signal }) =>
    async (action) => {
      dispatch({ type: "SET_PENDING", payload: true });
      try {
        const res = await axios.get(
          `http://localhost:8000/api/todo-items/${action.id}`
        );
        const { data } = res.data;
        dispatch({ type: "SET_PENDING", payload: false });
        dispatch({ type: "SET_CURRENT_TODO", payload: data });
        dispatch({ type: "SET_ERROR", payload: null });
      } catch (error) {
        dispatch({ type: "SET_PENDING", payload: false });
        dispatch({ type: "SET_ERROR", payload: "Er ging iets mis" });
      }
    },
  ADD_TODO_TO_DB:
    ({ dispatch, getState, signal }) =>
    async (action) => {
      dispatch({ type: "SET_PENDING", payload: true });
      try {
        const res = await axios.post(
          "http://localhost:8000/api/todo-items",
          action.todo
        );
        const { data } = res.data;
        dispatch({ type: "SET_PENDING", payload: false });
        dispatch({ type: "ADD_TODO", payload: data });
        dispatch({ type: "SET_ERROR", payload: null });
      } catch (error) {
        dispatch({ type: "SET_PENDING", payload: false });
        dispatch({ type: "SET_ERROR", payload: error.response.data });
      }
    },
  REMOVE_TODO_FROM_DB:
    ({ dispatch, getState, signal }) =>
    async (action) => {
      dispatch({ type: "SET_PENDING", payload: true });
      try {
        const res = await axios.delete(
          `http://localhost:8000/api/todo-items/${action.id}`
        );
        const { data } = res.data;
        dispatch({ type: "SET_PENDING", payload: false });
        dispatch({ type: "REMOVE_TODO", payload: action.id });
        dispatch({ type: "SET_ERROR", payload: null });
      } catch (error) {
        dispatch({ type: "SET_PENDING", payload: false });
        dispatch({ type: "SET_ERROR", payload: "Er ging iets mis" });
      }
    },
  EDIT_TODO_FROM_DB:
    ({ dispatch, getState, signal }) =>
    async (action) => {
      console.log("action.todo", action.todo.get("id"));
      dispatch({ type: "SET_PENDING", payload: true });
      try {
        const res = await axios.post(
          `http://localhost:8000/api/todo-items/${action.todo.get("id")}`,
          action.todo
        );
        const { data } = res.data;
        dispatch({ type: "SET_PENDING", payload: false });

        dispatch({ type: "EDIT_TODO", payload: data });
        dispatch({ type: "SET_ERROR", payload: null });
      } catch (error) {
        dispatch({ type: "SET_PENDING", payload: false });
        dispatch({ type: "SET_ERROR", payload: error.response.data });
      }
    },
  TOGGLE_COMPLETED_TO_DB:
    ({ dispatch, getState, signal }) =>
    async (action) => {
      dispatch({ type: "SET_PENDING", payload: true });
      console.log("action.todo", action.todo);
      try {
        const res = await axios.put(
          `http://localhost:8000/api/todo-items/${action.todo.id}/complete`,
          action.todo
        );
        const { data } = res.data;
        dispatch({ type: "SET_PENDING", payload: false });

        dispatch({ type: "EDIT_TODO", payload: data });
        dispatch({ type: "SET_ERROR", payload: null });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Er ging iets mis" });
      }
    }
};

export function TodosProvider({ children }) {
  const [state, dispatch] = useReducerAsync(
    todosReducer,
    {
      todos: [],
      todo: {},
      isPending: false,
      error: null
    },
    asyncActionHandlers
  );
  const initiliazeTodos = (todos) => {
    dispatch({ type: "LOAD_TODOS", payload: todos });
  };
  const setIsPending = (status) => {
    dispatch({ type: "SET_PENDING", payload: status });
  };

  const setError = (error) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const editTodo = (todo) => {
    const newTodos = state.todos;
    const todoIndex = newTodos.findIndex((t) => t.id == todo.id);
    newTodos[todoIndex] = {
      title: todo.title,
      image: todo.image,
      completed: todo.completed
    };
    dispatch({ type: "EDIT_TODO", payload: newTodos });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        let res = await axios({
          method: "get",
          url: "http://localhost:8000/api/todo-items"
        });
        const { data } = res.data;
        setIsPending(false);
        initiliazeTodos(data);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError("Could not fetch the data");
      }
    };
    fetchData();
  }, []);

  return (
    <TodosContext.Provider
      value={{
        ...state,
        dispatch,
        initiliazeTodos,
        editTodo,
        setIsPending,
        setError
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}
