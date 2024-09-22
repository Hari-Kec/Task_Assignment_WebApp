import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ManagerLogin = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Hardcoded credentials
    const techEmail = 'techadmin@gmail.com';
    const techPassword = 'techadmin';

    const constEmail='constadmin@gmail.com';
    const constPassword='constadmin';


    if (email === techEmail && password === techPassword && selectedRole) {
      navigate('/manager-dashboard'); // Redirect to manager-specific page after sign up
    } else {
      alert('Invalid credentials or role not selected');
    }
    if (email === constEmail && password === constPassword && selectedRole) {
      navigate('/construction-manager-dashboard'); // Redirect to manager-specific page after sign up
    } else {
      alert('Invalid credentials or role not selected');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 via-blue-300 to-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Login (Manager)</h1>
        </div>
        
        
        <form onSubmit={handleSignUp}>
          <input type="text" name="name" placeholder="Name" required className="w-full p-2 mb-4 border border-gray-300 rounded" />
          <input type="email" name="email" placeholder="Email" required className="w-full p-2 mb-4 border border-gray-300 rounded" />
          <input type="password" name="password" placeholder="Password" required className="w-full p-2 mb-4 border border-gray-300 rounded" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" required className="w-full p-2 mb-4 border border-gray-300 rounded" />
          <label htmlFor="role" className="block text-gray-700 mb-2">Select your manager role:</label>
          <select id="role" name="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} required className="w-full p-2 mb-4 border border-gray-300 rounded">
            <option value="">Select your role</option>
            <option value="Tech Manager">Tech Manager</option>
            <option value="Construction Manager">Construction Manager</option>
            <option value="Healthcare Manager">Healthcare Manager</option>
          </select>
          <input type="text" name="company" placeholder="Company Name" required className="w-full p-2 mb-4 border border-gray-300 rounded" />
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default ManagerLogin;
