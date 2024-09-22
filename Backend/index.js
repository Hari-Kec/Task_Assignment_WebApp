require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Groq = require('groq-sdk');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
// Route to handle chatbot queries
app.post('/ask-query', async (req, res) => {
  const { query } = req.body;
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: query }],
      model: 'llama3-8b-8192',
    });
    res.json({ response: chatCompletion.choices[0]?.message?.content || 'No response' });
  } catch (error) {
    res.status(500).json({ error: 'Error processing query' });
  }
});

// Connect to both databases
const techIndustryDb = mongoose.createConnection('mongodb://localhost:27017/tech-industry', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const constructionIndustryDb = mongoose.createConnection('mongodb://localhost:27017/construction', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define task schema
const taskSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  employeeEmail: {
    type: String,
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['todo', 'drafting', 'inReview', 'done'],
    default: 'todo',
  },
});

// Tech Industry Task Model
const TechTask = techIndustryDb.model('TechTask', taskSchema);

// Construction Industry Task Model
const ConstructionTask = constructionIndustryDb.model('ConstructionTask', taskSchema);

// API routes for tech workers
app.get('/tech-tasks/:userId', async (req, res) => {
  const tasks = await TechTask.find({ userId: req.params.userId });
  res.json(tasks);
});

app.post('/tech-tasks', async (req, res) => {
  const task = new TechTask(req.body); 
  await task.save();
  res.json(task);
});

app.put('/tech-tasks/:id', async (req, res) => {
  const task = await TechTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

app.delete('/tech-tasks/:id', async (req, res) => {
  await TechTask.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// API routes for construction workers
app.get('/construction/:userId', async (req, res) => {
  const constasks = await ConstructionTask.find({ userId: req.params.userId });
  res.json(constasks);
});

app.post('/construction', async (req, res) => {
  const ctask = new ConstructionTask(req.body); 
  await ctask.save();
  res.json(ctask);
});

app.put('/construction/:id', async (req, res) => {
  const ctask = await ConstructionTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(ctask);
});

app.delete('/construction/:id', async (req, res) => {
  await ConstructionTask.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// Proxy Flask API
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('/api/chat', createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true,
}));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
