import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoleSelection from './components/EntryPage/RoleSelection';
import WorkerLogin from './components/EntryPage/WorkerLogin';
import ManagerLogin from './components/EntryPage/ManagerLogin';
import TechIndustry from './components/TechIndustry/techIndustry';
import Manager from './components/TechIndustry/manager';
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<RoleSelection />} />
        <Route path="/worker-login" element={<WorkerLogin />} />
        <Route path="/manager-login" element={<ManagerLogin />} />
        <Route path='/tech-industry' element={<TechIndustry/>} />
        <Route path='/manager-dashboard' element={<Manager/>} />
        
      </Routes>
    </Router>
  );
};

export default App;