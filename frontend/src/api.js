/*
  The code uses Axios for making HTTP requests to the backend server.

  It handles:
  - Fetching tasks from the backend API
  - POSTing new tasks to backend API
*/
import axios from 'axios';

// edit later: we will be hosting the backend on EC2.
// replace local host with EC2 public IPv4 address
const API_URL = 'http://localhost:8000';

// get tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching tasks:", error);
  }
};

// add task
export const addTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error("There was an error adding the task:", error);
  }
};
