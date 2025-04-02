import logo from './logo.svg';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import React, {useState,useEffect, useMemo, useCallback } from 'react';
import Weather from './components/Weather';

function ExpensiveCalculation({numbers}){
  // without useMemo, this calculation would run on every render
  const sumOfSquares = useMemo(() => {
    console.log("Calculating sum of squares..");
    return numbers.reduce((sum, num) => sum + num * num, 0);
  }, [numbers]);
  return <div> Sum of Squares: {sumOfSquares}</div>
}

function Child ( {onIncrement}) {
  console.log("Child Rendered");
  return < button onClick={onIncrement}> Increment </button>

}
const MemoizedChild = React.memo(Child);

function App() {
  const [nums, setNums] = useState([1,2,3,4]);
  // simulate re-renders with dummy state
  const [count, setCount] = useState(0)
  const[childCount, setChildCount] = useState(0)


  const [todos,setTodos] = useState([]);
  const [loading,setLoading] = useState(true);

  const increment = useCallback(()=> {
    setChildCount(prevCount => prevCount + 1)
  })

  // old function
  // const addTodo = (text) => {
  //   const newTodo = {id: Date.now(), text, completed: false};
  //   setTodos([newTodo,...todos]);
  // }
  const addTodoToApi = (text) => {
    fetch('http://localhost:5000/todos', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({text})
    })
      .then(res => res.json())
      .then( newTodo => setTodos([newTodo, ...todos]));
  };


  

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => 
      todo.id === id? {...todo, completed: !todo.completed} : todo
      )
    );
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setTodos(todos.filter((todo)=> todo.id !== id))
      })
      .catch((err) => console.error("Failed to delete todo", err))
    
    
  };

  useEffect (() => {
    fetch('http://localhost:5000/todos')
    .then((res) => res.json())
    . then((data) => {
        setTodos(data);
        setLoading(false);
    })
    .catch ((error) => {
        console.error("Failed to fetch todos from backend", error);
        setLoading(false);
    });

},[])
  
if (loading) return <h1> loading..</h1>
  return (
    <div className="App">
      <Weather/>
      <h1> Todo App </h1>
      <TodoForm addTodo={addTodoToApi}/>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <div>
      <h1> use Memo Example</h1>
      <ExpensiveCalculation numbers={nums}/>
      <button onClick={() => setCount(count + 1)}> Re-render app ({count})</button>
      <button onClick={() => setNums([...nums, nums.length + 1])}> add number</button>
      <div> memoized function, Count: {childCount}</div>
      <MemoizedChild onIncrement={increment}/>
      </div>
      
      
    </div>
  );
}

export default App;
