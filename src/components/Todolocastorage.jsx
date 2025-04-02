import { useEffect, useState } from 'react';

function TodoLocalStorage() {
  const [todos, setTodos] = useState([]);

  // Load todos on mount
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // Save todos on change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const text = prompt("New todo:");
    if (text) {
      setTodos([{ text }, ...todos]);
    }
  };

  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      <ul>{todos.map((todo, idx) => <li key={idx}>{todo.text}</li>)}</ul>
    </div>
  );
}