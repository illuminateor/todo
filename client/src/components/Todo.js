import React, { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faEdit,
  faTrashAlt,
  faInfo
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Todo({ todo }) {
  const { dispatch, isPending } = useTodos();
  const [currentPending, setCurrentPending] = useState(false);

  const handleCompleted = (e) => {
    setCurrentPending(true);
    dispatch({
      type: "EDIT_TODO_FROM_DB",
      todo: { ...todo, completed: e.target.checked }
    });
  };

  let bgColor = "bg-gray-100 border-gray-400";
  if (todo.completed) {
    bgColor = "bg-green-50 border-green-400";
  }

  let containerClasses = `flex justify-around items-center border-2 rounded-xl hover:shadow-xl ${bgColor}`;

  let title = todo.title;

  if (currentPending) {
    title = (
      <FontAwesomeIcon
        icon={faSpinner}
        style={{ animation: "fa-spin 2s linear infinite" }}
      />
    );

    if (!isPending) {
      setCurrentPending(false);
    }
  }

  return (
    <div className={containerClasses}>
      <img
        src="/logo192.png"
        alt=""
        height="20px"
        width="50px"
        className="mx-2"
      />
      <input
        type="checkbox"
        checked={todo.completed}
        className="cursor-pointer mr-2"
        onChange={handleCompleted}
        style={{ transform: "scale(1.5)" }}
      />
      <div className="flex flex-col justify-between grow">
        <Link to={`/details/${todo.id}`}>
          <button className="bg-gray-200 px-1 py-2 hover:bg-gray-300 w-full">
            <FontAwesomeIcon icon={faInfo} className="mr-2" />
            <span className={todo.completed ? "line-through" : ""}>
              {title}
            </span>{" "}
          </button>
        </Link>
      </div>
      <div className="flex flex-col justify-evenly p-2 mr-2">
        <Link to={`/edit/${todo.id}`}>
          <button className="bg-blue-200 px-5 py-1 hover:bg-blue-300">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </Link>
        <button
          onClick={() => dispatch({ type: "REMOVE_TODO_FROM_DB", id: todo.id })}
          className="bg-red-200  px-5  py-1 hover:bg-red-300"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
}
