import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import Filter from './Filter';
import axios from 'axios';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get('https://backend-todo-theta.vercel.app/api/todos');
            setTodos(response.data);
        };
        fetchTodos();
    }, []);

    const addTodo = async (text) => {
        const newTodo = { text, completed: false, userId: 5 }; // Modify userId as needed
        const response = await axios.post('https://backend-todo-theta.vercel.app/api/todos', newTodo);
        setTodos([...todos, response.data]);
    };

    const toggleComplete = async (id) => {
        const todo = todos.find(todo => todo._id === id);
        await axios.put(`https://backend-todo-theta.vercel.app/api/todos/${id}`, { completed: !todo.completed });
        setTodos(todos.map(todo => (todo._id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    const deleteTodo = async (id) => {
        await axios.delete(`https://backend-todo-theta.vercel.app/api/todos/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'pending') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div>
            <h1>Todo List</h1>
            <AddTodo addTodo={addTodo} />
            <Filter setFilter={setFilter} />
            <ul>
                {filteredTodos.map(todo => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;