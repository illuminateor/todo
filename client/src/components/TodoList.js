import { useTodos } from "../hooks/useTodos";
function TodoList() {
  const { todos, editTodo, removeTodo } = useTodos();

  return (
    <ul className="list-none">
      {todos.map(function (todo, index) {
        return (
          <li
            key={todo.id}
            className="flex justify-between text-lg items-center"
          >
            <input
              type="checkbox"
              name="complete"
              onChange={(e) =>
                editTodo({ ...todo, complete: e.target.checked })
              }
              defaultChecked={todo.complete}
            />
            <img src="placeholder.png" width={50} height={50} />
            <div className={todo.complete ? "line-through" : ""}>
              {todo.title}
            </div>
            <div
              onClick={() => removeTodo(todo.id)}
              className="px-10 cursor-pointer"
            >
              X
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;
