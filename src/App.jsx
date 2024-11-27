import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./styles.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState("light-mode");

  // Fetch all todos on initial render
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post("http://localhost:8080/api/todos", newTodo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light-mode" ? "dark-mode" : "light-mode");
  };

  return (
    <div className={`App ${theme}`}>
      <button className={`toggle-btn ${theme}`} onClick={toggleTheme}>
        {theme === "light-mode" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </button>
      <h1>To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
