import { Link } from "react-router-dom";
import TodoList from "../../components/TodoList";

function Home() {
  return (
    <div className="flex justify-center content-center container">
      <div className="flex flex-col">
        <h1 className="text-lg justify-center align-middle">Todo List</h1>
        <Link to="/create">
          <h2>Add new Todo</h2>
        </Link>
        <TodoList />
      </div>
    </div>
  );
}

export default Home;
