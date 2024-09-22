// TechIndustry.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Construction = () => {
  const userId = '345'; // Replace with actual user ID
  const [todoTasks, setTodoTasks] = useState([]);
  const [draftingTasks, setDraftingTasks] = useState([]);
  const [inReviewTasks, setInReviewTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isQueryFormVisible, setIsQueryFormVisible] = useState(false); // Add state for query form visibility
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios.get(`http://localhost:5000/construction/${userId}`)


      .then((response) => {
        const tasks = response.data;
        setTodoTasks(tasks.filter(task => task.status === 'todo'));
        setDraftingTasks(tasks.filter(task => task.status === 'drafting'));
        setInReviewTasks(tasks.filter(task => task.status === 'inReview'));
        setDoneTasks(tasks.filter(task => task.status === 'done'));
      })
      .catch((error) => console.error(error));
  }, [userId]);

  const moveTask = (task, source, target, newStatus) => {
    source((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
    axios.put(`http://localhost:5000/construction/${task._id}`, { ...task, status: newStatus })


      .then((response) => {
        target((prevTasks) => [...prevTasks, response.data]);
      })
      .catch((error) => console.error(error));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const taskName = event.target.elements.taskName.value;
    const dueDate = event.target.elements.dueDate.value;
    axios.post('http://localhost:5000/construction', { taskName, dueDate, userId })


      .then((response) => {
        setTodoTasks((prevTasks) => [...prevTasks, response.data]);
        setIsFormVisible(false);
      })
      .catch((error) => console.error(error));
  };

  const handleQuerySubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/ask-query', { query })
      .then((response) => {
        setResponse(response.data.response);
      })
      .catch((error) => console.error(error));
  };

  const handleSafetyMeasuresClick = () => {
    navigate('/const-safety'); // Navigate to the safety measures page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-100 text-black shadow-md w-full fixed top-0 left-0 z-10">
        <div className="max-w-full px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Construction</h1>

          {/* Right side - Links */}
          <div className="flex space-x-4 sm:space-x-8">
            <a href="/const-worker-dashboard" className="bg-green-500 hover:bg-green-700 text-lg font-bold text-white py-2 px-4 rounded transition duration-200">View Dashboard</a>
            <button
              className="bg-green-500 hover:bg-green-700 text-lg font-bold text-white py-2 px-4 rounded transition duration-200"
              onClick={() => setIsFormVisible(true)}
            >
              Create Task
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-lg font-bold text-white py-2 px-4 rounded transition duration-200"
              onClick={() => setIsQueryFormVisible(true)} // Toggle query form visibility
            >
              Ask a Question
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-lg font-bold text-white py-2 px-4 rounded transition duration-200"
              onClick={handleSafetyMeasuresClick} // Navigate to safety measures page
            >
              Safety Measures
            </button>
          </div>
        </div>
      </nav>

      {/* Task Board */}
      <div className="pt-20 px-4 sm:px-10 py-5 mt-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {/* To Do Column */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">To Do</h2>
            <div className="space-y-4">
              {todoTasks.map((task) => (
                <div key={task._id} className="bg-gray-100 p-3 rounded-lg shadow">
                  <h3 className="font-semibold">{task.taskName}</h3>
                  <span className="text-xs text-red-600">Due: {task.dueDate}</span>
                  {/* Move to Drafting */}
                  <button
                    className="text-blue-500 hover:text-blue-700 mt-2"
                    onClick={() => moveTask(task, setTodoTasks, setDraftingTasks, 'drafting')}
                  >
                    Move to Drafting
                  </button>
                </div>
              ))}
            </div>

            {/* Show Add Task button or form */}
            {!isFormVisible ? (
              <button
                onClick={() => setIsFormVisible(true)} // Show form on click
                className="bg-green-500 hover:bg-green-700 text-sm font-bold text-white py-2 px-4 rounded transition duration-200 mt-5"
              >
                Add Task +
              </button>
            ) : (
              // Task form
              <form onSubmit={handleFormSubmit} className="mt-4">
                <input
                  name="taskName"
                  type="text"
                  placeholder="Task Name"
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                  required
                />
                <input
                  name="dueDate"
                  type="date"
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-sm font-bold text-white py-2 px-4 rounded"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormVisible(false)} // Hide form
                  className="ml-2 bg-gray-500 hover:bg-gray-700 text-sm font-bold text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>

          {/* Query Form */}
          {isQueryFormVisible && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-6 z-20">
              <form onSubmit={handleQuerySubmit}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask something..."
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-sm font-bold text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsQueryFormVisible(false)}
                  className="ml-2 bg-gray-500 hover:bg-gray-700 text-sm font-bold text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </form>
              {response && (
                <div className="mt-4 p-2 border border-gray-300 rounded">
                  <h3 className="font-bold">Response:</h3>
                  <p>{response}</p>
                </div>
              )}
            </div>
          )}

          {/* Drafting Column */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Drafting</h2>
            <div className="space-y-4">
              {draftingTasks.map((task) => (
                <div key={task._id} className="bg-gray-100 p-3 rounded-lg shadow">
                  <h3 className="font-semibold">{task.taskName}</h3>
                  <span className="text-xs text-red-600">Due: {task.dueDate}</span>
                  {/* Move to In Review */}
                  <button
                    className="text-blue-500 hover:text-blue-700 mt-2"
                    onClick={() => moveTask(task, setDraftingTasks, setInReviewTasks, 'inReview')}
                  >
                    Move to In Review
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* In Review Column */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">In Review</h2>
            <div className="space-y-4">
              {inReviewTasks.map((task) => (
                <div key={task._id} className="bg-gray-100 p-3 rounded-lg shadow">
                  <h3 className="font-semibold">{task.taskName}</h3>
                  <span className="text-xs text-red-600">Due: {task.dueDate}</span>
                  {/* Move to Done */}
                  <button
                    className="text-blue-500 hover:text-blue-700 mt-2"
                    onClick={() => moveTask(task, setInReviewTasks, setDoneTasks, 'done')}
                  >
                    Move to Done
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Done</h2>
            <div className="space-y-4">
              {doneTasks.map((task) => (
                <div key={task._id} className="bg-gray-100 p-3 rounded-lg shadow">
                  <h3 className="font-semibold">{task.taskName}</h3>
                  <span className="text-xs text-red-600">Due: {task.dueDate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Construction;
