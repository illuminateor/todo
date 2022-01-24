import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTodos } from "../../hooks/useTodos";

export default function Edit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [image, setImage] = useState();
  const { dispatch, currentTodo, isPending, error } = useTodos();
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

  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!isPending) {
      const formData = new FormData();
      formData.append("id", currentTodo.id);
      formData.append("title", title);
      formData.append("description", description);
      let newCompleted = completed !== "" ? completed : currentTodo.completed;
      formData.append("completed", newCompleted === false ? "0" : "1");
      if (image !== undefined) {
        formData.append("image", image);
      }

      try {
        await dispatch({ type: "EDIT_TODO_FROM_DB", todo: formData });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(error);

  return (
    <>
      <h1 className="text-lg justify-center align-middle">
        Todo {currentTodo && currentTodo.id} bewerken
      </h1>
      <Link to="/">
        <h2>Ga terug</h2>
      </Link>
      {error && (
        <span className="text-red-300 weight font-bold">{error.message}</span>
      )}
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
            {error?.errors?.title && (
              <div>
                <span className="text-red-300 weight font-bold">
                  {error.errors.title[0]}
                </span>
              </div>
            )}
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
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="mb-2 border-0"
            />
            {error?.errors?.image && (
              <div>
                <span className="text-red-300 weight font-bold">
                  {error.errors.image[0]}
                </span>
              </div>
            )}
            {preview ? (
              <div>
                <span>Preview afbeelding</span>
                <img src={preview} alt="" />
              </div>
            ) : (
              <div>
                <span>Huidige afbeelding</span>
                <img
                  src={`http://localhost:8000/storage/images/${currentTodo.image}`}
                  alt=""
                />
              </div>
            )}
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
