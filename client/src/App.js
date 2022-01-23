// App.js
import * as React from "react";
import { useState } from "react";
import { Routes, Route, Switch, Link } from "react-router-dom";
import TodosContext from "./context/TodosContext";
import Create from "./pages/create/Create";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
