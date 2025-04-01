import {useState} from 'react';

function TodoForm({ addTodo}) {
    const [input, setInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            addTodo(input);
            setInput('');
        }
    };

return (
    <form onSubmit={handleSubmit}>
        <input
        value ={input}
        onChange= {(e) => setInput(e.target.value)}
        placeholder = "add a new task.."
        />
        <button type="submit"> Add </button>
    </form>
);

}

export default TodoForm;