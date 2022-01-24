import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTodos } from "../../hooks/useTodos";

export default function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [image, setImage] = useState("");
  const { dispatch, isPending } = useTodos();
  let navigate = useNavigate();

  const handleAdding = async (e) => {
    e.preventDefault();
    if (title !== "") {
      let todo = {
        title,
        description,
        image,
        completed
      };
      try {
        await dispatch({ type: "ADD_TODO_TO_DB", todo });
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
        Nieuwe Todo toevoegen
      </h1>
      <Link to="/">
        <h2>Ga terug</h2>
      </Link>
      <form>
        <div className="border-2 rounded-xl hover:shadow-xl bg-gray-100 border-gray-400 flex flex-col p-5 pt-2">
          <label htmlFor="title">Titel</label>
          <input
            id="title"
            value={title}
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
          ></textarea>
          <label className="mb-2">
            <input
              type="checkbox"
              checked={completed}
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
            onClick={handleAdding}
            type="submit"
            className="p-3 text-red-100 bg-gray-600 hover:bg-gray-500"
          >
            {isPending ? (
              <FontAwesomeIcon
                icon={faSpinner}
                style={{ animation: "fa-spin 2s linear infinite" }}
              />
            ) : (
              "Toevoegen"
            )}{" "}
          </button>
        </div>
      </form>
    </>
  );
}
