import { createContext } from 'react'

const TodosContext = createContext({
    todos:[],
    addTodo: () => {},
    removeTodo: () => {},
    editTodo: () => {},
});

export default TodosContext;