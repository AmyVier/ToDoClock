"""
This file contains the API for the Flask application.

Routes:
- POST /account: send account username/password to see if the account exists
- POST /add_account: add account.

- GET /tasks: Retrieve all tasks from the database
- POST /tasks: Add a new task to the database
- DELETE /delete_task: delete task

This file should be executed in a Flask environment.
"""

from flask import Blueprint, request, jsonify
from datetime import datetime
from .dynamodb import get_all_tasks, add_task, get_user, add_user, delete_task

# Initialize a Flask blueprint for routing
routes = Blueprint('routes', __name__)

# Route see if account exists
# Request Body: Username, Password
@routes.route('/account', methods=['POST'])
def account_exists():
    data = request.get_json()

    username = data.get('Username')
    password = data.get('Password')

    # Validate input
    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    # see if user exists
    exists = get_user(username, password)

    if exists is not None:
        if exists:
            return jsonify(exists), 200
        else:
            return jsonify({"message": "No account with values provided existed"}), 500
    else:
        return jsonify({"message": "Error fetching account"}), 500

# Route to add a new user
# Request Body: Username, Password
@routes.route('/add_account', methods=['POST'])
def add_account():
    data = request.get_json()

    username = data.get('Username')
    password = data.get('Password')

    # Validate input
    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    # Add the user to DynamoDB
    success = add_user(username, password)

    if success:
        return jsonify({"message": "User added successfully"}), 200
    else:
        return jsonify({"message": "Error adding user"}), 500

# Route to get all tasks from account
# Query String: Username
# Response Body: Username, TaskID, Task_name, Task_description, Task_start_date, 
# Task_end_date
# (task dates are in the format: "hh:mm")
@routes.route('/tasks', methods=['GET'])
def tasks():
    username = request.args.get('Username')

    # Validate input
    if not username:
        return jsonify({"message": "Username is required"}), 400

    # get tasks
    tasks = get_all_tasks(username)

    if tasks is not None:
        return jsonify(tasks), 200
    else:
        return jsonify({"message": "Error fetching tasks"}), 500

# Helper function to validate the time format and ensure start < end
def is_valid_time(time_str):
    try:
        # Convert the time string to a datetime object
        return datetime.strptime(time_str, "%H:%M")
    except ValueError:
        return None

# Route to add a task
# Request Body: Username, Task_name, Task_description, Task_start_date, 
# Task_end_date
@routes.route('/tasks', methods=['POST'])
def add_new_task():
    data = request.get_json()

    task_username = data.get('Username')
    task_name = data.get('Task_name', 'Untitled Task')
    task_description = data.get('Task_description', 'No Description')
    task_start_date = data.get('Task_start_date')
    task_end_date = data.get('Task_end_date')

     # Validate input
    if not task_username or not task_start_date or not task_end_date:
        return jsonify({"message": "Username and Task Time Period are required"}), 400
    
    # Validate times
    start_time = is_valid_time(task_start_date)
    end_time = is_valid_time(task_end_date)

    if not start_time or not end_time:
        return jsonify({"message": "Time format must be HH:MM"}), 400
    
    if start_time >= end_time:
        return jsonify({"message": "Task start time must be before task end time"}), 400
    
    # add tasks
    result = add_task(task_username, task_name, task_description, 
                        task_start_date, task_end_date)
    
    if result['status'] == 'success':
        return jsonify(result), 200
    else:
        return jsonify({"message": "Error adding task"}), 500

# Route to delete task 
# Response Body: Username, TaskID
@routes.route('/delete_task', methods=['DELETE'])
def delete_task_route():
    # Retrieve JSON data from the request body
    data = request.get_json()
    
    username = data.get('Username')
    task_id = data.get('Task_id')

    # Validate input
    if not username or not task_id:
        return jsonify({"message": "Username and Task_id are required"}), 400

    # Delete the task from DynamoDB
    success = delete_task(username, task_id)

    if success:
        return jsonify({"message": "Task deleted successfully"}), 200
    else:
        return jsonify({"message": "Error deleting task"}), 500
    
