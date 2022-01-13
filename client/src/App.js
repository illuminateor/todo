// App.js
import * as React from "react";
import { useState } from 'react';
import { Routes, Route, Switch, Link } from "react-router-dom";
import TodosContext from "./context/TodosContext";
import Home from "./Home";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Item',
      image: 'placeholder.png',
      complete: false,
    }]
  )

  const removeTodo = function(id) {
    setTodos([...todos.filter(todo => todo.id !== id)])
  };

  const editTodo = function(id, title, image, complete) {
    const newTodos = todos;
    const todoIndex = newTodos.findIndex(todo => todo.id == id);
    console.log('complete', complete);
    newTodos[todoIndex] = {
      id,
      title,
      image,
      complete
    };
    setTodos([...newTodos]);
  }

  return (
      <TodosContext.Provider value={{todos, addTodo: setTodos, removeTodo, editTodo: editTodo}}>
        <div className="bg-gray-200 min-h-screen">
        <Routes>
              <Route path="/" element={<Home />} />
        </Routes>
        </div>
      </TodosContext.Provider>
  );
}

export default App;