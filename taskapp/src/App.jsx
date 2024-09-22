import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoleSelection from './components/EntryPage/RoleSelection';
import WorkerLogin from './components/EntryPage/WorkerLogin';
import ManagerLogin from './components/EntryPage/ManagerLogin';
import TechIndustry from './components/TechIndustry/techIndustry';
import Safety from './components/TechIndustry/safety';
import Manager from './components/TechIndustry/manager';
import DashboardCharts from './components/TechIndustry/dashboard';
import Construction from './components/Construction/construction';
import ConstManager from './components/Construction/constManager';
import ConstCharts from './components/Construction/constDashboard';
import ConstSafety from './components/Construction/constSafety';
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<RoleSelection />} />
        <Route path="/worker-login" element={<WorkerLogin />} />
        <Route path="/manager-login" element={<ManagerLogin />} />
        <Route path='/tech-industry' element={<TechIndustry/>} />
        <Route path='safety-measures' element={<Safety/>} />
        <Route path='/manager-dashboard' element={<Manager/>} />
        <Route path='/dashboard' element={<DashboardCharts/>} />
        <Route path='/construction' element={<Construction/>} />
        <Route path='/construction-manager' element={<ConstManager/>} />
        <Route path='/const-worker-dashboard' element={<ConstCharts/>} />
        <Route path='/const-safety' element={<ConstSafety/>} />


      </Routes>
    </Router>
  );
};

export default App;