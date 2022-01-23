import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (context === undefined) {
    throw new Error("useTodos() must be used inside ThemeProvider");
  }

  return context;
};
