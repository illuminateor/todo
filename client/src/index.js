import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TodosProvider } from "./context/TodosContext";

ReactDOM.render(
  <React.StrictMode>
    <TodosProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TodosProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
