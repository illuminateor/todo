import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTodos } from "../../hooks/useTodos";

export default function Create() {
  const [title, setTitle] = useState("");
  const { addTodo } = useTodos();
  let navigate = useNavigate();

  function handleAdding(e) {
    e.preventDefault();
    if (title !== "") {
      let todo = {
        id: Number(Date.now() + Math.random() * 1000),
        title: title,
        image: "placeholder.png",
        complete: false
      };
      addTodo(todo);
      setTitle("");
      navigate("/");
    }
  }
  return (
    <div className="flex justify-center content-center container">
      <div className="flex flex-col">
        <h1 className="text-lg justify-center align-middle">Add new Todo</h1>
        <Link to="/">
          <h2>Go back</h2>
        </Link>
        <form action="#">
          <div className="bg-gray-400">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="m-2 w-60"
            />
            <input
              type="file"
              name=""
              id=""
              className="p-2 text-white border-0"
            />
            <button
              onClick={handleAdding}
              type="submit"
              className="p-3 text-red-100 bg-gray-600 hover:bg-gray-500"
            >
              Toevoegen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
