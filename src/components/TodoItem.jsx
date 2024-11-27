import React from "react";

const TodoItem = ({ todo, deleteTodo }) => {
  return (
    <li>
      <span>{todo.title}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
