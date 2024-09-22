import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const WorkerLogin = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Hardcoded credentials
    const techEmail = 'hari@gmail.com';
    const techPassword = 'hari';

    const constEmail = 'anand@gmail.com';
    const constPassword = 'anand';


    if (email === techEmail && password === techPassword && password === confirmPassword && selectedRole) {
      navigate('/tech-industry'); // Redirect to worker-specific page after sign up
    } else {
      alert('Invalid credentials or passwords do not match');
    }
    if (email === constEmail && password === constPassword && password === confirmPassword && selectedRole) {
      navigate('/construction'); // Redirect to worker-specific page after sign up
    } else {
      alert('Invalid credentials or passwords do not match');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 via-blue-300 to-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Login (Worker)</h1>
        </div>
        
        
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <label htmlFor="role" className="block text-gray-700 mb-2">Select your worker role:</label>
          <select
            id="role"
            name="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="">Select your role</option>
            <option value="Tech Worker">Tech Worker</option>
            <option value="Construction Worker">Construction Worker</option>
            <option value="Healthcare Worker">Healthcare Worker</option>
          </select>
          <input
            type="text"
            placeholder="Company Name"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default WorkerLogin;
