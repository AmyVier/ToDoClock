import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import SignIn from './pages/signIn';
import SignUp from './pages/signup';
import Edit from './pages/edit';
import Features from './pages/features';
import Home from './pages/home';
import DayClock from './pages/24hrClock';

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<SignIn />} /> 
            <Route path="/signUp" element={<SignUp />} /> 
            <Route path="/edit" element={<Edit />} /> 
            <Route path="/features" element={<Features />} /> 
            <Route path="/" element={<Home />} /> 
            <Route path="/clock" element={<DayClock />} /> 
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
