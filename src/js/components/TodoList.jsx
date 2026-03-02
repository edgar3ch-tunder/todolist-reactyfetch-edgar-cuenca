import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  
  // URL de la API
  const API_URL = "https://playground.4geeks.com/todo";
  const USER_NAME = "edgarcito_1"; // mi usuario

  // 1. GET /users/{user_name} - Obtener tareas
  const getTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${USER_NAME}`);
      if (response.status === 404) {
        createUser();
      } else {
        const data = await response.json();
        setTodos(data.todos); // Según el schema: { name: "...", todos: [...] }
      }
    } catch (error) {
      console.error("Error cargando tareas:", error);
    }
  };

  // 2. POST /users/{user_name} - Crear Usuario
  const createUser = async () => {
    try {
      await fetch(`${API_URL}/users/${USER_NAME}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      getTasks(); 
    } catch (error) {
      console.error("Error creando usuario:", error);
    }
  };

  // 3. POST /todos/{user_name} - Crear Tarea
  const addTask = async (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newTask = { label: inputValue, is_done: false }; 
      try {
        const response = await fetch(`${API_URL}/todos/${USER_NAME}`, {
          method: "POST",
          body: JSON.stringify(newTask),
          headers: { "Content-Type": "application/json" }
        });
        if (response.ok) {
          setInputValue("");
          getTasks(); // aqui se sincroniza con el servidor
        }
      } catch (error) {
        console.error("Error agregando tarea:", error);
      }
    }
  };

  // 4. DELETE /todos/{todo_id} - Eliminar Tarea
  const deleteTodo = async (todoId) => {
    try {
      const response = await fetch(`${API_URL}/todos/${todoId}`, {
        method: "DELETE"
      });
      if (response.ok) getTasks();
    } catch (error) {
      console.error("Error eliminando tarea:", error);
    }
  };

  // 5. DELETE /users/{user_name} - Borrar todo 
  const clearAll = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${USER_NAME}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setTodos([]);
        createUser(); // se vuelve a crear el usuario
      }
    } catch (error) {
      console.error("Error limpiando todo:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

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
              onKeyDown={addTask}
            />
          </li>
          {todos.length === 0 ? (
            <li className="task-item text-muted">No tasks, add a task</li>
          ) : (
            todos.map((todo) => (
              <li key={todo.id} className="task-item">
                {todo.label}
                <span className="delete-icon" onClick={() => deleteTodo(todo.id)}>✕</span>
              </li>
            ))
          )}
        </ul>
        <div className="footer d-flex justify-content-between">
          <span>{todos.length} items left</span>
          <button className="btn btn-danger btn-sm" onClick={clearAll}>Clear All</button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;