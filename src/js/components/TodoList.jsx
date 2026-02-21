import React, { useState } from "react";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  

  const [todos, setTodos] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
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


          {todos.length === 0 ? (
            <li className="task-item text-muted justify-content-center">
              No tasks, add a task
            </li>
          ) : (
            todos.map((task, index) => (
              <li key={index} className="task-item">
                {task}
                <span className="delete-icon" onClick={() => deleteTodo(index)}>
                  ✕
                </span>
              </li>
            ))
          )}
        </ul>
        <div className="footer">{todos.length} items left</div>
      </div>
    </div>
  );
};

export default TodoList;