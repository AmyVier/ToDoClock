/*
  The code is for the features page
*/

import React from 'react';
import { useUser } from '../context/UserContext';

const Features = () => {
  const { username, signOut } = useUser(); // to rerender page when user signout

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
              <li><a href="/" className="nav-link px-2 text-info">Home</a></li>
              <li><a href="/features" className="nav-link px-2 text-white">Features</a></li>
            </ul>
            <div className="text-end">
              {username ? (
                <>
                  {/* Buttons visible when the user is logged in */}
                  <a href="/clock"><button type="button" className="btn btn-outline-light me-2">To-do Clock</button></a>
                  <a href="/edit"><button type="button" className="btn btn-info me-2">Edit Tasks</button></a>
                  <button type="button" onClick={handleLogout} className="btn btn-outline-danger me-2">Sign Out</button>
                </>
              ) : (
                <>
                  {/* Buttons visible when the user is not logged in */}
                  <a href="/login"><button type="button" className="btn btn-outline-light me-2">Login</button></a>
                  <a href="/signUp"><button type="button" className="btn btn-info">Sign-up</button></a>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Functional Features</h2>
        <div className="row g-4 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-info bg-gradient fs-2 mb-3 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-list-stars" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
                <path d="M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.28.28 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.27.27 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.28.28 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.27.27 0 0 0 .259-.194zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.28.28 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.27.27 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.28.28 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.27.27 0 0 0 .259-.194zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.28.28 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.27.27 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.28.28 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.27.27 0 0 0 .259-.194z"/>
              </svg>
            </div>
            <h3 className="fs-2 text-body-emphasis">Create, Add, Remove</h3>
            <p>Users can create, add, and remove to-do tasks and set dates and descriptions for tasks.</p>
          </div>
    
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-info bg-gradient fs-2 mb-3 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-lock" viewBox="0 0 16 16">
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 5.996V14H3s-1 0-1-1 1-4 6-4q.845.002 1.544.107a4.5 4.5 0 0 0-.803.918A11 11 0 0 0 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664zM9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1"/>
              </svg>
            </div>
            <h3 className="fs-2 text-body-emphasis">Create A Personal Account</h3>
            <p>Users can sign up and create an account, as well as log in. All personal data is confidential and private.</p>
          </div>
    
          <div className="feature col">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-info bg-gradient fs-2 mb-3 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
              </svg>
            </div>
            <h3 className="fs-2 text-body-emphasis">Clock-Esque Visual</h3>
            <p>Users can see tasks in a clock-esque manner, allowing easy visualization and planning.</p>
          </div>
        </div>
      </div>    

      <div className="container col-xxl-8 px-4">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img src="/assets/AWS.jpg" className="d-block mx-lg-auto img-fluid aws" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Reliable and Responsive</h1>
            <p className="lead">To-Do Clock is highly available, reliable, and is hosted on AWS. The website is easy to navigate and the clock updates in real-time.</p>
          </div>
        </div>
      </div>    

      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-body-secondary">To-Do Clock</p>

        <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" fill="currentColor" className="bi me-2" viewBox="0 0 16 16">
            <use xlinkHref="#bootstrap"></use>
          </svg>
        </a>
      </footer>
    </div>
  );
};

export default Features;
