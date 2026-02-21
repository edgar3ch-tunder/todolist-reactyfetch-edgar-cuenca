import React, { useState } from "react";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState(["Make the bed", "Wash my hands"]);

  // Agregar tarea al presionar Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue(""); // Limpiar el input
    }
  };

  // Eliminar tarea por índice
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="container">
      <h1>todos</h1>
      <div className="todo-card">
        <ul>
          <li>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </li>
          {todos.map((task, index) => (
            <li key={index} className="task-item">
              {task}
              <span className="delete-icon" onClick={() => deleteTodo(index)}>
                ✕
              </span>
            </li>
          ))}
        </ul>
        <div className="footer">{todos.length} items left</div>
      </div>
    </div>
  );
};

export default TodoList;