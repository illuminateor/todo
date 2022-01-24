// App.js
import * as React from "react";
import { useState } from "react";
import { Routes, Route, Switch, Link } from "react-router-dom";
import TodosContext from "./context/TodosContext";
import Create from "./pages/create/Create";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Edit from "./pages/edit/Edit";

function App() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div
        className="flex flex-col gap-5"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
