import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTodos } from "../../hooks/useTodos";

export default function Edit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [image, setImage] = useState("");
  const { dispatch, todos, currentTodo, isPending } = useTodos();
  let navigate = useNavigate();
  let params = useParams();
  let id = params.id;

  useEffect(() => {
    const fetchTodo = async () => {
      await dispatch({ type: "FETCH_TODO_FROM_DB", id: id });
    };

    if (!currentTodo || currentTodo.id !== id.id) {
      fetchTodo();
    }
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!isPending) {
      let todo = {
        id: currentTodo.id,
        title: title !== "" ? title : currentTodo.title,
        description: description !== "" ? description : currentTodo.description,
        image: image !== "" ? image : currentTodo.image,
        completed: completed !== "" ? completed : currentTodo.completed
      };
      try {
        await dispatch({ type: "EDIT_TODO_FROM_DB", todo });
        setTitle("");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 className="text-lg justify-center align-middle">
        Todo {currentTodo && currentTodo.id} bewerken
      </h1>
      <Link to="/">
        <h2>Ga terug</h2>
      </Link>
      {currentTodo && (
        <form>
          <div className="border-2 rounded-xl hover:shadow-xl bg-gray-100 border-gray-400 flex flex-col p-5 pt-2">
            <label htmlFor="title">Titel</label>
            <input
              id="title"
              defaultValue={currentTodo.title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-auto mb-2"
            />
            <label htmlFor="description">Beschrijving</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              name=""
              id="description"
              cols="30"
              rows="10"
              className="mb-2"
              defaultValue={currentTodo.description}
            ></textarea>
            <label className="mb-2">
              <input
                type="checkbox"
                defaultChecked={currentTodo.completed}
                onChange={(e) => setCompleted(e.target.checked)}
                name=""
                id=""
                className="mr-2"
              />
              <span>Voldaan</span>
            </label>
            <label htmlFor="image">Afbeelding</label>
            <input
              type="file"
              name=""
              id="image"
              onChange={(e) => setImage(e.target.value)}
              className="mb-2 text-white border-0"
            />
            <button
              onClick={handleEdit}
              type="submit"
              className="p-3 text-red-100 bg-gray-600 hover:bg-gray-500"
            >
              {isPending ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  style={{ animation: "fa-spin 2s linear infinite" }}
                />
              ) : (
                "Bewerken"
              )}
            </button>
          </div>
        </form>
      )}
    </>
  );
}
