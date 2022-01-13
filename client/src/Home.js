import TodoList from "./components/TodoList";
import { useContext, useState } from 'react';
import TodosContext from "./context/TodosContext";

function Home() {
  const todosContext = useContext(TodosContext)
  const [title, setTitle] = useState('');

  function addTodo(e){
    e.preventDefault();
    if(title !== '') {
      todosContext.addTodo([...todosContext.todos, {
        id: Number(Date.now() + (Math.random() * 1000)),
        title: title,
        image: 'placeholder.png',
        complete: false,
      }]);
      setTitle('');
    }
  }
  return (
    <div className="flex justify-center content-center container">
      <div className="flex flex-col">
        <h1 className="text-lg justify-center align-middle">Todo List</h1>
        <form action="#">
          <div className="bg-gray-400">
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="m-2 w-60"/>
            <input type="file" name="" id="" className="p-2 text-white border-0"/>
            <button onClick={addTodo} type="submit" className="p-3 text-red-100 bg-gray-600 hover:bg-gray-500">Toevoegen</button>
          </div>
        </form>
          <TodoList/>
      </div>
    </div>
  );
}

export default Home;
