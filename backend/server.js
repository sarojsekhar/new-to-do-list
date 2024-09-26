const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://sarojsekhar25:QyiJcOhjFdEdvPPn@mycluster.vr9ru.mongodb.net/todos?retryWrites=true&w=majority&appName=MyCluster')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Todo schema
const todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    userId: { type: Number, required: true },
});

const Todo = mongoose.model('Todo', todoSchema);

// API routes
// Add a new todo
app.post('/api/todos', async (req, res) => {
    const { text, completed, userId } = req.body;
    try {
        const newTodo = new Todo({ text, completed, userId });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ error: 'Error creating todo' });
    }
});

// Get all todos
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching todos' });
    }
});

// Update a todo
app.put('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ error: 'Error updating todo' });
    }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: 'Error deleting todo' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});