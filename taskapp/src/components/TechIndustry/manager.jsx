//manager.jsx
import React, { useState } from 'react';

const Manager = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      employeeName,
      employeeEmail,
      taskName,
      dueDate,
    });

    // Clear the form
    setEmployeeName('');
    setEmployeeEmail('');
    setTaskName('');
    setDueDate('');
    setIsFormVisible(false); // Hide the form after submission
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

      {/* Form */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Create Task</h2>
            <form onSubmit={handleFormSubmit}>
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
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
              >
                Add Task
              </button>
            </form>
            <button
              className="mt-4 w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
              onClick={() => setIsFormVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manager;