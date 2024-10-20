import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheckCircle } from '@fortawesome/free-solid-svg-icons'; // Icons

import loginImage from '../../assets/loginLogo.jpeg'; // Importing the image

const WorkerLogin = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    
    const techEmail = 'hari@gmail.com';
    const techPassword = 'hari';

    const constEmail = 'anand@gmail.com';
    const constPassword = 'anand';

    const healthEmail = 'akash@gmail.com';
    const healthPassword = 'akash';

    const fireEmail = 'vijay@gmail.com';
    const firePassword = 'vijay';

    if ( email === techEmail && password === techPassword && password === confirmPassword && selectedRole) {
      navigate('/tech-industry');
    } else if (email === constEmail && password === constPassword && password === confirmPassword && selectedRole) {
      navigate('/construction');
    } else if (email === healthEmail && password === healthPassword && password === confirmPassword && selectedRole) {
      navigate('/healthcare-worker');
    } else if (email === fireEmail && password === firePassword && password === confirmPassword && selectedRole) {
      navigate('/fireservice-worker');
    } else {
      alert('Invalid credentials or passwords do not match');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="container mx-auto flex shadow-lg rounded-lg overflow-hidden max-w-4xl">
        {/* Image Section */}
        <div className="w-1/2">
          <img
            src={loginImage}
            alt="Login Visual"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Login Form Section */}
        <div className="w-1/2 p-8 bg-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Worker Login</h2>
          
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            {/* Password Input with Toggle Visibility */}
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>

            {/* Confirm Password Input with Matching Tick */}
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {confirmPassword && confirmPassword === password && (
                <span className="absolute inset-y-0 right-3 flex items-center text-green-500">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </span>
              )}
            </div>

            {/* Role Dropdown */}
            <label htmlFor="role" className="block text-gray-700 mb-2">Select your worker role:</label>
            <select
              id="role"
              name="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select your role</option>
              <option value="Tech Worker">Tech Worker</option>
              <option value="Construction Worker">Construction Worker</option>
              <option value="Healthcare Worker">Healthcare Worker</option>
              <option value="Fire Service Worker">Fire Service Worker</option>
            </select>
            
            <input
              type="text"
              placeholder="Company Name"
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkerLogin;
