import { createContext, useReducer } from "react";

export const TodosContext = createContext({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  editTodo: () => {}
});

const todosReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: [...state.todos.filter((t) => t.id !== action.payload)]
      };
    case "EDIT_TODO":
      return {
        ...state,
        todos: [...action.payload]
      };
    default:
      return state;
  }
};

export function TodosProvider({ children }) {
  const [state, dispatch] = useReducer(todosReducer, {
    todos: []
  });

  const addTodo = (todo) => {
    dispatch({ type: "ADD_TODO", payload: todo });
  };

  const removeTodo = (id) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  const editTodo = (todo) => {
    const newTodos = state.todos;
    const todoIndex = newTodos.findIndex((t) => t.id == todo.id);
    newTodos[todoIndex] = {
      title: todo.title,
      image: todo.image,
      complete: todo.complete
    };
    dispatch({ type: "EDIT_TODO", payload: newTodos });
  };

  return (
    <TodosContext.Provider value={{ ...state, addTodo, removeTodo, editTodo }}>
      {children}
    </TodosContext.Provider>
  );
}
