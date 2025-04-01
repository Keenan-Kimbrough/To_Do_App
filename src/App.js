import logo from './logo.svg';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import {useState } from 'react';


function App() {
  const [todos,setTodos] = useState([]);
  
  const addTodo = (text) => {
    const newTodo = {id: Date.now(), text, completed: false};
    setTodos([newTodo,...todos]);
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => 
      todo.id === id? {...todo, completed: !todo.completed} : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id != id));
  };
  return (
    <div className="App">
      <h1> Todo App </h1>
      <TodoForm addTodo={addTodo}/>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      
    </div>
  );
}

export default App;
