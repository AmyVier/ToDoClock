/*
  The code is for the sign up page
*/

import React, { useState } from 'react';
import { addAccount } from '../api';

const SignUp = () => {
  const [username, setUsername] = useState(''); // state for username
  const [password, setPassword] = useState(''); // state for password
  const [accountStatus, setAccountStatus] = useState(null); // To manage account status messages

  // sign up
  const handleSubmit = async (event) => {
    event.preventDefault();

    const statusCode = await addAccount(username, password);

    // check for existing account 
    if (statusCode === 200) {
      setAccountStatus('Created');
    } else {
      setAccountStatus('Exists');
    }
  };

  return (
    <div>
      <div className="bg-dark text-info py-4 text-center">
        <h2 className="mb-0">To-Do Clock</h2>
      </div>

      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="card w-50 p-4" style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <h3 className="text-center mb-4 text-info">Sign-Up</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-info w-100">Sign-Up</button>
          </form>
          
          {/* Conditional rendering for account status */}
          {accountStatus === "Exists" && (
            <div className="alert alert-danger mt-3 text-center">
              Pick A Different Username!
            </div>
          )}
          {accountStatus === "Created" && (
            <div className="alert alert-success mt-3 text-center">
              Account Successfully Created!
            </div>
          )}
          {accountStatus === "Created" && (
            <div className="text-center mt-2">
              <a href="/login" className="btn btn-info w-50">Login</a>
            </div>
          )}
        </div>
      </div>

      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-body-secondary">To-Do Clock</p>
          <a
            href="/"
            className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" fill="currentColor" className="bi me-2" viewBox="0 0 16 16">
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
              <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
            </svg>
          </a>
          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Home</a></li>
            <li className="nav-item"><a href="/features" className="nav-link px-2 text-body-secondary">Features</a></li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default SignUp;
