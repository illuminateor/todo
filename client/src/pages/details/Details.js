import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTodos } from "../../hooks/useTodos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function Details() {
  const { dispatch, currentTodo, setError } = useTodos();
  let navigate = useNavigate();
  let params = useParams();
  let id = params.id;

  useEffect(() => {
    const fetchTodo = async () => {
      await dispatch({ type: "FETCH_TODO_FROM_DB", id: id });
    };
    fetchTodo();
  }, []);

  const handleDelete = async () => {
    try {
      dispatch({ type: "REMOVE_TODO_FROM_DB", id: currentTodo.id });
      navigate("/");
    } catch (error) {
      setError("Could not delete todo");
      console.log(error.message);
    }
  };

  const handleCompleted = async (e) => {
    try {
      dispatch({
        type: "TOGGLE_COMPLETED_TO_DB",
        todo: { id: currentTodo.id, completed: e.target.checked }
      });
    } catch (error) {
      setError("Unable to complete todo");
      console.log(error.message);
    }
  };

  return (
    <>
      <h1 className="text-lg justify-center align-middle">
        Todo {currentTodo && currentTodo.id} details
      </h1>
      <Link to="/">
        <h2>Ga terug</h2>
      </Link>
      {currentTodo && (
        <div className="border-2 rounded-xl hover:shadow-xl bg-gray-100 border-gray-400 flex flex-col p-5 pt-2">
          <img
            src={
              currentTodo.image !== ""
                ? `http://localhost:8000/storage/images/${currentTodo.image}`
                : "/logo192.png"
            }
            alt=""
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={currentTodo.completed}
              className="cursor-pointer mr-2"
              onChange={handleCompleted}
              style={{ transform: "scale(1.5)" }}
            />
            {currentTodo.title}
          </div>
          <p>{currentTodo.description}</p>
          <div className="flex flex-col justify-evenly pt-4">
            <Link to={`/edit/${currentTodo.id}`}>
              <button className="bg-blue-200 px-5 py-1 hover:bg-blue-300 w-full">
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </Link>
            <button
              onClick={() => handleDelete()}
              className="bg-red-200  px-5  py-1 hover:bg-red-300"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
