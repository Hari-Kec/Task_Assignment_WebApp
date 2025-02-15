const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Groq = require('groq-sdk');
const { createConnection } = require('mongoose');
const { Schema } = mongoose; 
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
app.use(cors());
// app.use(json());

app.get("/", (req, res) => {
  res.send("Hello World!");
})

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });



const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

if (!MONGODB_URI) {
  console.error("❌ MongoDB connection string is missing!");
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


const techIndustryDb = createConnection(`${MONGODB_URI}tech-industry`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const constructionIndustryDb = createConnection(`${MONGODB_URI}construction`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const healthcareIndustryDb = createConnection(`${MONGODB_URI}healthcare`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fireserviceIndustryDb = createConnection(`${MONGODB_URI}fireservice`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['todo', 'drafting', 'inReview', 'done'],
    default: 'todo',
  },
  assignedTo: String,
  createdAt: { type: Date, default: Date.now },
  employeeName: String,
  employeeEmail: String,
  taskName: String,
  dueDate: Date,
  todayDate: Date,
  userId: String,
});

const TechTask = techIndustryDb.model('TechTask', taskSchema, 'tasks');
const ConstructionTask = constructionIndustryDb.model('ConstructionTask', taskSchema);
const HealthTask = healthcareIndustryDb.model('HealthTask', taskSchema);
const FireServiceTask = fireserviceIndustryDb.model('FireServiceTask', taskSchema);

app.post('/register-user', async (req, res) => {
  const { email } = req.body;
  const dbName = `db_${email.replace(/[@.]/g, '_')}`;

  try {
    console.log(`Creating new database for user ${email} with dbName: ${dbName}`);
    const newDbConnection = createConnection(`${MONGODB_URI}${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    newDbConnection.model('UserTask', taskSchema, 'tasks');
    console.log(`Database ${dbName} created successfully.`);
    res.json({ success: true, dbName });
  } catch (error) {
    console.error('Error creating new database:', error.message);
    res.status(500).json({ success: false, error: 'Error creating new database.' });
  }
});

const createCrudRoutes = (app, model, path) => {
  app.get(`/${path}/:userId`, async (req, res) => {
    const tasks = await model.find({ userId: req.params.userId });
    res.json(tasks);
  });

  app.post(`/${path}`, async (req, res) => {
    const task = new model(req.body);
    await task.save();
    res.json(task);
  });

  app.put(`/${path}/:id`, async (req, res) => {
    const task = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  });

  app.delete(`/${path}/:id`, async (req, res) => {
    await model.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  });
};

createCrudRoutes(app, TechTask, 'tech-tasks');
createCrudRoutes(app, ConstructionTask, 'construction');
createCrudRoutes(app, HealthTask, 'healthcare');
createCrudRoutes(app, FireServiceTask, 'fireservice');

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

app.use('/api/chat', createProxyMiddleware({
  target: 'http://localhost:5001',
  changeOrigin: true,
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
