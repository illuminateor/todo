// App.js
import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;