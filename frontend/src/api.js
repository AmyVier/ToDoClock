/*
  The code uses Axios for making HTTP requests to the backend server.

  It handles:
  - Fetching tasks from the backend API
  - POSTing new tasks to backend API
*/
import axios from 'axios';

// edit later: we will be hosting the backend on EC2.
// replace local host with EC2 public IPv4 address
const API_URL = 'http://18.220.226.207:8000';

// Check if account exists
export const checkAccount = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/account`, {
      Username: username,
      Password: password
    });
    return response.status;
  } catch (error) {
    console.error('Error fetching account:', error.response?.data || error.message);
  }
};

// Add new account
export const addAccount = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/add_account`, {
      Username: username,
      Password: password
    });
    return response.status;
  } catch (error) {
    console.error('Error adding user:', error.response?.data || error.message);
  }
};

// get tasks
export const getTasks = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      params: { Username: username }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error.response?.data || error.message);
  }
};

// add task
export const addTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.status;
  } catch (error) {
    console.error("There was an error adding the task:", error);
  }
};

// Delete task
export const deleteTask = async (username, taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete_task`, {
      data: { Username: username, Task_id: taskId }
    });
    return response.status;
  } catch (error) {
    console.error('Error deleting task:', error.response?.data || error.message);
  }
};

export const updateTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/update_task`, taskData);
    return response.status;
  } catch (error) {
    console.error('Error updating task:', error.response?.data || error.message);
  }
};