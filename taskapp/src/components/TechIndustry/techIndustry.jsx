import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TechIndustry = () => {
  const userId = '123'; // Replace with actual user ID (you can fetch it from auth or hardcode for now)

  const [todoTasks, setTodoTasks] = useState([]);
  const [draftingTasks, setDraftingTasks] = useState([]);
  const [inReviewTasks, setInReviewTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Fetch tasks for the current user
  useEffect(() => {
    axios.get(`http://localhost:5000/tasks/${userId}`)
      .then((response) => {
        const tasks = response.data;
        setTodoTasks(tasks.filter(task => task.status === 'todo'));
        setDraftingTasks(tasks.filter(task => task.status === 'drafting'));
        setInReviewTasks(tasks.filter(task => task.status === 'inReview'));
        setDoneTasks(tasks.filter(task => task.status === 'done'));
      })
      .catch((error) => console.error(error));
  }, [userId]);

  // Function to handle form submission (adds to "To Do" list)
  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = { name: taskName, dueDate, userId, status: 'todo' };
    axios.post('http://localhost:5000/tasks', newTask)
      .then((response) => {
        setTodoTasks([...todoTasks, response.data]);
        setTaskName('');
        setDueDate('');
        setIsFormVisible(false);
      })
      .catch((error) => console.error(error));
  };

  // Function to move a task between columns and update its status
  const moveTask = (task, source, target, newStatus) => {
    source((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
    axios.put(`http://localhost:5000/tasks/${task._id}`, { ...task, status: newStatus })
      .then((response) => {
        target((prevTasks) => [...prevTasks, response.data]);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-100 text-black shadow-md w-full fixed top-0 left-0 z-10">
        <div className="max-w-full px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Tech Industry</h1>

          {/* Right side - Links */}
          <div className="flex space-x-4 sm:space-x-8">
            <a href="/dashboard" className="text-xl text-black">View Dashboard</a>
            <button
              className="bg-green-500 hover:bg-green-700 text-lg font-bold text-white py-2 px-4 rounded transition duration-200"
              onClick={() => setIsFormVisible(true)}
            >
              Create Task
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
              {todoTasks.map((task, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-lg shadow">
                  <h3 className="font-semibold">{task.name}</h3>
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
              <form onSubmit={handleAddTask} className="mt-4">
                <input
                  type="text"
                  placeholder="Task Name"
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)} // Update task name
                  required
                />
                <input
                  type="date"
                  placeholder="Due Date"
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)} // Update due date
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

          {/* Drafting Column */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Drafting</h2>
            <div className="space-y-4">
              {draftingTasks.map((task, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-lg shadow">
                  <h3 className="font-semibold">{task.name}</h3>
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
              {inReviewTasks.map((task, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-lg shadow">
                  <h3 className="font-semibold">{task.name}</h3>
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
              {doneTasks.map((task, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-lg shadow">
                  <h3 className="font-semibold">{task.name}</h3>
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

export default TechIndustry;
