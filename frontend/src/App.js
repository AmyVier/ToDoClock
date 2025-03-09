import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getTasks, addTask } from './api';  
import Clock from './Clock'; 


function App() {
  return (
    <Router>
      <div>
        {/* Define your routes here */}
        <Routes>
          {/* to test out clock UI */}
          <Route path="/testClock" element={<Clock />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
