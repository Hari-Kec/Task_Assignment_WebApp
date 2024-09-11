import React from 'react';
import '../Choice/choicePage.css'; // Make sure to create this CSS file

const ChoicePage = ({ onChoice }) => {
  return (
    <div className="choice-container">
      <h1>Choose Your Role</h1>
      <div className="choice-buttons">
        <button className="choice-button" onClick={() => onChoice('worker')}>Worker</button>
        <button className="choice-button" onClick={() => onChoice('admin')}>Admin</button>
      </div>
    </div>
  );
};

export default ChoicePage;
