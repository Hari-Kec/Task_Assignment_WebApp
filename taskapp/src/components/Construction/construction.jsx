// TechIndustry.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Construction = () => {
  const userId = '345';
  const [todoTasks, setTodoTasks] = useState([]);
  const [draftingTasks, setDraftingTasks] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [inReviewTasks, setInReviewTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isQueryFormVisible, setIsQueryFormVisible] = useState(false); 
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const navigate = useNavigate(); 
  const [todayDate , settodayDate]=useState('');

  useEffect(() => {
    axios.get(`https://3.26.234.195:5000/construction/${userId}`)


      .then((response) => {
        const tasks = response.data.map(task => ({
          ...task,
          dueDate: new Date(task.dueDate).toISOString().split('T')[0] 
        }));
        setTodoTasks(tasks.filter(task => task.status === 'todo'));
        setDraftingTasks(tasks.filter(task => task.status === 'drafting'));
        setInReviewTasks(tasks.filter(task => task.status === 'inReview'));
        setDoneTasks(tasks.filter(task => task.status === 'done'));
      })
      .catch((error) => console.error(error));
  }, [userId]);

  const moveTask = (task, source, target, newStatus) => {
    source((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
    axios.put(`https://3.26.234.195:5000/construction/${task._id}`, { ...task, status: newStatus })


      .then((response) => {
        target((prevTasks) => [...prevTasks, response.data]);
      })
      .catch((error) => console.error(error));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const task = {
      employeeName,
      employeeEmail,
      taskName,
      dueDate,
      todayDate,
      userId: '345',
      status: 'todo' 
    };

    axios.post('https://3.26.234.195:5000/construction', task)
      .then((response) => {

        console.log('Task added:', response.data);

        setEmployeeName('');
        setEmployeeEmail('');
        setTaskName('');
        setDueDate('');
        settodayDate('');
        setIsFormVisible(false); 
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };
  const deleteTask = (taskId, status) => {
    axios.delete(`https://3.26.234.195:5000/tech-tasks/${taskId}`)
      .then(() => {
        if (status === 'todo') {
          setTodoTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } else if (status === 'drafting') {
          setDraftingTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } else if (status === 'inReview') {
          setInReviewTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } else if (status === 'done') {
          setDoneTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        }
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  const handleQuerySubmit = (event) => {
    event.preventDefault();
    axios.post('https://3.26.234.195:5000/ask-query', { query })
      .then((response) => {
        setResponse(response.data.response);
      })
      .catch((error) => console.error(error));
  };

  const handleSafetyMeasuresClick = () => {
    navigate('/const-safety'); 
  };

  return (
    <div className="min-h-screen bg-gray-100">
 
      <nav className="bg-gray-100 text-black shadow-md w-full fixed top-0 left-0 z-10">
        <div className="max-w-full px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Construction</h1>


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
              onClick={() => setIsQueryFormVisible(true)} 
            >
              Ask a Question
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-lg font-bold text-white py-2 px-4 rounded transition duration-200"
              onClick={handleSafetyMeasuresClick} 
            >
              Safety Measures
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-20 px-4 sm:px-10 py-5 mt-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">To Do</h2>
            <div className="space-y-4">
              {todoTasks.map((task) => (
                <div key={task._id} className="bg-gray-100 p-3 rounded-lg shadow">
                  <h3 className="font-semibold">{task.taskName}</h3>
                  <span className="text-xs text-red-600">Due: {task.dueDate}</span>
                  <h2 className="text-xs text-red-600">
  Created Date: {new Date(task.todayDate).toLocaleDateString('en-CA')} 
</h2>
<button
                    className="text-red-500 p-4 hover:text-red-700 mt-2"
                    onClick={() => deleteTask(task._id, 'todo')} 
                  >
                    Delete Task
                  </button>
        
                  <button
                    className="text-blue-500 hover:text-blue-700 mt-2"
                    onClick={() => moveTask(task, setTodoTasks, setDraftingTasks, 'drafting')}
                  >
                    Move to Drafting
                  </button>
                </div>
              ))}
            </div>


            {!isFormVisible ? (
              <button
                onClick={() => setIsFormVisible(true)} 
                className="bg-green-500 hover:bg-green-700 text-sm font-bold text-white py-2 px-4 rounded transition duration-200 mt-5"
              >
                Add Task +
              </button>
            ) : (
    
              <form onSubmit={handleFormSubmit} className="mt-4">
                 <input
                type="text"
                placeholder="Employee Name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                placeholder="Employee Email"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
              />
                <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
              />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
              />
              <input
                  type="date"
                  value={todayDate}
                  onChange={(e) => settodayDate(e.target.value)}
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
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

 
          <div className={`mt-4 transform transition-all duration-500 ease-in-out ${isQueryFormVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-10 scale-90 pointer-events-none'}`}>
  {isQueryFormVisible && (
    <form onSubmit={handleQuerySubmit} className="transition-all">
      <input
        type="text"
        placeholder="Ask your question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Submit Query
      </button>
      <button
        type="button"
        onClick={() => setIsQueryFormVisible(false)} // Hide query form
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Cancel
      </button>
    </form>
  )}
  {response && (
    <div className="mt-4 transition-opacity duration-500 ease-in-out">
      <h3 className="font-semibold mb-2">Response:</h3>
      <div className="bg-gray-100 p-4 rounded-md shadow-sm">
        {response.includes('```') ? (
        
          <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto">
            <code>{response.replace(/```/g, '')}</code> 
          </pre>
        ) : (
          <p className="whitespace-pre-wrap">{response}</p>
        )}
      </div>
    </div>
  )}
</div>


 
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Drafting</h2>
            <div className="space-y-4">
              {draftingTasks.map((task) => (
                <div key={task._id} className="bg-gray-100 p-3 rounded-lg shadow">
                  <h3 className="font-semibold">{task.taskName}</h3>
                  <span className="text-xs text-red-600">Due: {task.dueDate}</span>
                  <button
                    className="text-red-500 p-4 hover:text-red-700 mt-2"
                    onClick={() => deleteTask(task._id, 'todo')} 
                  >
                    Delete Task
                  </button>
             
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

          
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">In Review</h2>
            <div className="space-y-4">
              {inReviewTasks.map((task) => (
                <div key={task._id} className="bg-gray-100 p-3 rounded-lg shadow">
                  <h3 className="font-semibold">{task.taskName}</h3>
                  <span className="text-xs text-red-600">Due: {task.dueDate}</span>
                  <button
                    className="text-red-500 p-4 hover:text-red-700 mt-2"
                    onClick={() => deleteTask(task._id, 'todo')} 
                  >
                    Delete Task
                  </button>
         
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

          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Done</h2>
            <div className="space-y-4">
            {doneTasks.map((task) => (
                <div key={task._id} className="bg-gray-100 p-3 rounded-lg shadow">
                  <h3 className="font-semibold">{task.taskName}</h3>
                  <span className="text-xs text-red-600">Due: {task.dueDate}</span>
                  
                  <button
                    className="text-red-500 p-4 hover:text-red-700 mt-2"
                    onClick={() => deleteTask(task._id, 'done')} 
                  >
                    Delete Task
                  </button>
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
