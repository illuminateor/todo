import { useContext } from "react";
import TodosContext from "../context/TodosContext";

function TodoList()
{
    const todosContext = useContext(TodosContext)
    console.log(todosContext);
    return (
        <ul className="list-none">
            {todosContext.todos.map(function(todo, index) { 
                return (
                    <li key={todo.id} className="flex justify-between text-lg items-center">
                        <input type="checkbox" name="complete" onChange={(e) => todosContext.editTodo(todo.id, todo.title, todo.image, e.target.checked )} defaultChecked={todo.complete}/>
                        <img src="placeholder.png" width={50} height={50}/>
                        <div className={todo.complete ? "line-through" : ""}>{todo.title}</div>
                        <div onClick={() => todosContext.removeTodo(todo.id)} className="px-10 cursor-pointer">X</div>
                    </li>
                )})}
        </ul>
    )
}

export default TodoList;