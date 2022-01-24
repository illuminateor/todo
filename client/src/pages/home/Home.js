import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TodoList from "../../components/TodoList";
import { useTodos } from "../../hooks/useTodos";

function Home() {
  return (
    <>
      <h1 className="text-lg justify-center align-middle">Todo Lijst</h1>
      <Link to="/create">
        <h2>Nieuwe Todo toevoegen</h2>
      </Link>
      {<TodoList />}
    </>
  );
}

export default Home;
