import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser } from '../context/UserContext';
import { getTasks, addTask, deleteTask } from '../api';

const Edit = () => {
  const { username } = useUser();
  const [taskList, setTaskList] = useState([]);  // State to hold tasks


  const [taskData, setTaskData] = useState({
    Task_name: '',
    Task_description: '',
    Task_start_date: '',
    Task_end_date: '',
  });

  // Add state for form visibility toggle
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (username) {
      const fetchTasks = async () => {
        const tasks = await getTasks(username);
        if (tasks) {
          setTaskList(tasks);
        }
      };

      fetchTasks();
    }
  }, [username]); // This will re-run whenever username changes

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskComplete = {
      ...taskData,  // Spread the existing task data
      Task_completion: false,  // Add Task_completion with false
      Username: username,
    };


    try {
      // Add the new task using the addTask function
      const status = await addTask(taskComplete);

      if (status === 200) {
        // If the task was successfully added, update the task list
        setTaskList([...taskList, taskComplete]);
        setTaskData({
          Task_name: '',
          Task_description: '',
          Task_start_date: '',
          Task_end_date: '',
        });  // Clear the form after submission
      } 
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const status = await deleteTask(username, taskId);
      if (status === 200) {
        // If the deletion was successful, remove the task from the list
        setTaskList(taskList.filter((task) => task.TaskID !== taskId));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Toggle form visibility
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
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
              {!username ? (
                <>
                  <a href="/login"><button type="button" className="btn btn-outline-light me-2">Login</button></a>
                  <a href="/signUp"><button type="button" className="btn btn-info">Sign-up</button></a>
                </>
              ) : (
                <>
                  <a href="/clock"><button type="button" className="btn btn-outline-light me-2">To-Do Clock</button></a>
                  <a href="/edit"><button type="button" className="btn btn-info">Edit Clock</button></a>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {username && (
        <div className="container mt-4">
          <div className="d-flex justify-content-center mb-4">
            <button
              className="btn btn-info px-5"
              type="button"
              onClick={toggleForm} // Toggle form visibility using React state
            >
              <span className="h5">New Task</span>
            </button>
          </div>

          {isFormVisible && ( // Conditionally render the form based on state
            <div className="mt-3 pb-3">
              <form onSubmit={handleSubmit} className="border p-4 bg-light shadow-sm rounded">
                <div className="mb-3">
                  <label className="form-label text-secondary h4">Title</label>
                  <input
                    type="text"
                    name="Task_name"
                    className="form-control"
                    value={taskData.Task_name}
                    onChange={handleChange}
                    required
                  />
                  <div className="form-text">Give a title to your task.</div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary h4">Description</label>
                  <textarea
                    name="Task_description"
                    className="form-control"
                    rows="3"
                    value={taskData.Task_description}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <div className="form-text">Type details about the task.</div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary h4">Start Time</label>
                  <input
                    type="time"
                    name="Task_start_date"
                    className="form-control"
                    value={taskData.Task_start_date}
                    onChange={handleChange}
                    required
                  />
                  <div className="form-text">Time that the task starts.</div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary h4">End Time</label>
                  <input
                    type="time"
                    name="Task_end_date"
                    className="form-control"
                    value={taskData.Task_end_date}
                    onChange={handleChange}
                    required
                  />
                  <div className="form-text">Time that the task ends.</div>
                </div>

                <button type="submit" className="btn btn-info">Make Task</button>
              </form>
            </div>
          )}
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

              <form onSubmit={() => handleDelete(task.TaskID)}>
                <button className="btn btn-info" type="submit">Delete</button>
              </form>
            </div>
            <div className="card-body">
              <p className="card-text">{task.Task_description}</p>
            </div>
          </div>
        </div>
      ))}

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
  );
};

export default Edit;
