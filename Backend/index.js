// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/tech-industry', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Task Schema and Model
const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Associate with a user
  name: String,
  dueDate: String,
  status: { type: String, enum: ['todo', 'drafting', 'inReview', 'done'], default: 'todo' }
});

const Task = mongoose.model('Task', taskSchema);

// API routes

// Get tasks for a specific user
app.get('/tasks/:userId', async (req, res) => {
  const tasks = await Task.find({ userId: req.params.userId });
  res.json(tasks);
});

// Create a new task
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body); // Ensure the userId is included in the body
  await task.save();
  res.json(task);
});

// Update a task by ID
app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// Delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
