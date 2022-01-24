import { useTodos } from "../hooks/useTodos";
import Todo from "./Todo";
function TodoList() {
  const { todos, isPending, error } = useTodos();

  return (
    <>
      {isPending && !todos && <div>Loading todos...</div>}
      {error && <div>{error}</div>}
      {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
    </>
  );
}

export default TodoList;
