import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons'; // Worker and Manager icons

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
      <div className="flex space-x-4"> {/* Added Flexbox and spacing */}
        <button
          onClick={handleWorkerLogin}
          className="flex items-center bg-blue-500 text-white border-none py-2 px-4 mx-2 cursor-pointer text-lg rounded-md transition-colors duration-300 hover:bg-blue-700"
        >
          <FontAwesomeIcon icon={faUser} className="mr-2" /> {/* Worker icon */}
          Worker Login
        </button>
        <button
          onClick={handleManagerLogin}
          className="flex items-center bg-blue-500 text-white border-none py-2 px-4 mx-2 cursor-pointer text-lg rounded-md transition-colors duration-300 hover:bg-blue-700"
        >
          <FontAwesomeIcon icon={faUserTie} className="mr-2" /> {/* Manager icon */}
          Manager Login
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
