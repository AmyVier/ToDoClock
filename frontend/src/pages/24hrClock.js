/*
  The code is for the clock page
*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Clock from '../components/Clock';
import { getTasks } from '../api';

const DayClock = () => {
  const { username, signOut } = useUser(); // to rerender page when user signout
  const [taskList, setTaskList] = useState([]);  // State to hold tasks
  const [loading, setLoading] = useState(true); // set clock UI to loading when tasks are still getting fetched

  // log out from clicking button
  const handleLogout = () => {
    signOut(); 
  };

  // turn time into degrees from clock UI
  const timeToDegrees = (hours, minutes) => {
    return (hours * 15) + (minutes * 0.25);
  };

  // clock UI, rerender when username changes
  useEffect(() => {
    if (username) {
      const fetchTasks = async () => {
        try {
          const tasks = await getTasks(username);

          if (tasks && tasks.length > 0) {
            // Convert startTime and endTime to degrees for each task
            const tasksWithDegrees = tasks.map(task => {
              const startTime = task.Task_start_date;
              const endTime = task.Task_end_date;

              // Convert startTime and endTime to degrees
              const startDegrees = timeToDegrees(parseInt(startTime.substring(0, 2)), parseInt(startTime.substring(3, 5)));
              const endDegrees = timeToDegrees(parseInt(endTime.substring(0, 2)), parseInt(endTime.substring(3, 5)));

              return {
                ...task,
                startDegrees,
                endDegrees
              };
            });

            // Store the tasks with degrees in state
            setTaskList(tasksWithDegrees);
          } else {
            setTaskList([]); // If no tasks are returned
          }
        } catch (err) {
          console.log('Error fetching tasks', err);
          setTaskList([]); // Fallback if error occurs
        } finally {
          setLoading(false);
        }
      };

      fetchTasks();

    }
  }, [username]);

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

      {/* Render Loading State if Data is Fetching */}
      {username && loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <p>Loading tasks...</p> 
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          {/* Render Clock Component only when data is ready */}
          <Clock taskList={taskList} />
        </div>
      )}

      {username && taskList.length > 0 && taskList.map((task) => (
        <div className="container my-4" key={task.TaskID}>
          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title text-secondary fs-3">{task.Task_name}</h5>
                <small className="text-muted d-block">Start Time: {task.Task_start_date}</small>
                <small className="text-muted d-block">End Time: {task.Task_end_date}</small>
              </div>
            </div>
            <div className="card-body">
              <p className="card-text">{task.Task_description}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-body-secondary">To-Do Clock</p>

          <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" fill="currentColor" className="bi me-2" viewBox="0 0 16 16">
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
              <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
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

export default DayClock;
