import { useState } from 'react'
import Login from './components/Login/login.jsx'
import './App.css'
import ChoicePage from './components/Choice/choicePage.jsx'
function App() {
  const [role, setRole] = useState(null);

  const handleRoleChoice = (selectedRole) => {
    setRole(selectedRole);
  };

  if (!role) {
    return <ChoicePage onChoice={handleRoleChoice} />;
  }

  return (
    <div>
      <Login role={role} />
    </div>
  );
}

export default App;
