//index.js
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


const techIndustryDb = mongoose.createConnection('mongodb://localhost:27017/tech-industry', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const constructionIndustryDb = mongoose.createConnection('mongodb://localhost:27017/construction', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const healthcareIndustryDb= mongoose.createConnection('mongodb://localhost:27017/healthcare',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fireserviceIndustryDb= mongoose.createConnection('mongodb://localhost:27017/fireservice',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



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
  todayDate: {
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


const TechTask = techIndustryDb.model('TechTask', taskSchema, 'tasks');

const ConstructionTask = constructionIndustryDb.model('ConstructionTask', taskSchema);


const HealthTask =healthcareIndustryDb.model('healthTask' , taskSchema);

const fireserviceTask =fireserviceIndustryDb.model('fireserviceTask' , taskSchema)

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


app.get('/healthcare/:userId', async (req, res) => {
  const htasks = await HealthTask.find({ userId: req.params.userId });
  res.json(htasks);
});

app.post('/healthcare', async (req, res) => {
  const htask = new HealthTask(req.body); 
  await htask.save();
  res.json(htask);
});

app.put('/healthcare/:id', async (req, res) => {
  const htask = await HealthTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(htask);
});

app.delete('/healthcare/:id', async (req, res) => {
  await HealthTask.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});



app.get('/fireservice/:userId', async (req, res) => {
  const ftasks = await fireserviceTask.find({ userId: req.params.userId });
  res.json(ftasks);
});

app.post('/fireservice', async (req, res) => {
  const ftask = new fireserviceTask(req.body); 
  await ftask.save();
  res.json(ftask);
});

app.put('/fireservice/:id', async (req, res) => {
  const ftask = await fireserviceTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(ftask);
});

app.delete('/fireservice/:id', async (req, res) => {
  await fireserviceTask.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('/api/chat', createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true,
}));


const PORT = process.env.PORT || 5000;
app.listen(PORT);