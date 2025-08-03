import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './index.css';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [internData, setInternData] = useState(null);

  const handleLogin = (data) => {
    setInternData(data);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setInternData(null);
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard internData={internData} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;