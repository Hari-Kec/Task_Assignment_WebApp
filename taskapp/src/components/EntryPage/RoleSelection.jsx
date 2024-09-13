import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleWorkerLogin = () => {
    navigate('/worker-login');
  };

  const handleManagerLogin = () => {
    navigate('/manager-login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-5 text-2xl font-bold">Select Login Type</h1>
      <button
        onClick={handleWorkerLogin}
        className="bg-blue-500 text-white border-none py-2 px-4 mx-2 cursor-pointer text-lg rounded-md transition-colors duration-300 hover:bg-blue-700"
      >
        Worker Login
      </button>
      <button
        onClick={handleManagerLogin}
        className="bg-blue-500 text-white border-none py-2 px-4 mx-2 cursor-pointer text-lg rounded-md transition-colors duration-300 hover:bg-blue-700"
      >
        Manager Login
      </button>
    </div>
  );
};

export default RoleSelection;
