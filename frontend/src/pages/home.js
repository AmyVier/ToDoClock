/*
  The code is for the home page or / page
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Home = () => { 
  const { username, signOut } = useUser(); // to rerender page when sign out

  // sign out button
  const handleLogout = () => {
    signOut();
  };

  return (
    <div>
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                <use xlinkHref="#bootstrap"></use>
              </svg>
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><Link to="/" className="nav-link px-2 text-info">Home</Link></li>
              <li><Link to="/features" className="nav-link px-2 text-white">Features</Link></li>
            </ul>

            <div className="text-end">
              {!username ? (
                <>
                  <a href="/login"><button type="button" className="btn btn-outline-light me-2">Login</button></a>
                  <a href="/signUp"><button type="button" className="btn btn-info">Sign-up</button></a>
                </>
              ) : (
                <>
                  <a href="/clock"><button type="button" className="btn btn-outline-light me-2">To-Do Clock</button></a>
                  <a href="/edit"><button type="button" className="btn btn-info">Edit Clock</button></a>
                  <button type="button" onClick={handleLogout} className="btn btn-outline-danger me-2">Sign Out</button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 pt-5 my-5 text-center border-bottom">
        <h1 className="display-4 fw-bold text-body-emphasis">To-Do Clock</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">The To-Do Clock is a website that allows users to set tasks that they need to do for the day. The website organizes the tasks in a 24-hour clock interface that enables the user to see how their tasks are arranged for the day and whether they have been completed.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <Link to="/features">
              <button type="button" className="btn btn-info btn-lg px-4 me-sm-3">Features</button>
            </Link>
            {!username ? (
              <Link to="/signUp">
                <button type="button" className="btn btn-outline-secondary btn-lg px-4">Sign-up</button>
              </Link>
            ) : (
              <Link to="/clock">
                <button type="button" className="btn btn-outline-secondary btn-lg px-4">To-Do Clock</button>
              </Link>
            )}
          </div>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: '62vh' }}>
          <div className="container px-5">
            <img src="/assets/ToDoImage.webp" className="img-fluid border rounded-3 shadow-lg mb-4" alt="To-Do Clock" width="900" height="900" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-body-secondary">To-Do Clock</p>

          <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" fill="currentColor" className="bi me-2" viewBox="0 0 16 16">
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>

          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Home</Link></li>
            <li className="nav-item"><Link to="/features" className="nav-link px-2 text-body-secondary">Features</Link></li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default Home;
