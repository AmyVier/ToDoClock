"""
This file contains the backend routes for the Flask application.

It includes all the API routes.

Routes:
- GET /tasks: Retrieve all tasks from the database
- POST /tasks: Add a new task to the database

This file should be executed in a Flask environment.
"""

from flask import Blueprint, request, jsonify
from .dynamodb import get_all_tasks, add_task, get_user, add_user, delete_task, edit_task

# Initialize a Flask blueprint for routing
routes = Blueprint('routes', __name__)

@routes.route('/account', methods=['POST'])
def account_exists():
    data = request.get_json()
    username = data.get('Username')
    password = data.get('Password')

    exists = get_user(username, password)
    if exists is not None:
        if exists:
            return jsonify(exists), 200
        else:
            return jsonify({"message": "No account with values provided existed"}), 500
    else:
        return jsonify({"message": "Error fetching account"}), 500

# Route to add a new user
@routes.route('/add_account', methods=['POST'])
def add_account():
    # Retrieve the JSON data from the request body
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

# Route to get all tasks from DynamoDB
# Response Body: Username, TaskID, Task_name, Task_description, Task_start_date, 
# Task_end_date, Task_completion
# (task dates are in the format: "yyyy-mm-dd hh:mm" and Task_completion is False/True)
@routes.route('/tasks', methods=['GET'])
def tasks():
    username = request.args.get('Username')
    tasks = get_all_tasks(username)
    if tasks is not None:
        return jsonify(tasks), 200
    else:
        return jsonify({"message": "Error fetching tasks"}), 500

# Route to add a new task to DynamoDB
# Request Body: Username, Task_name, Task_description, Task_start_date, 
# Task_end_date, Task_completion
@routes.route('/tasks', methods=['POST'])
def add_new_task():
    data = request.get_json()

    # to change later: attributes may be changed/deleted/added
    task_username = data.get('Username')
    task_name = data.get('Task_name')
    task_description = data.get('Task_description')
    task_start_date = data.get('Task_start_date')
    task_end_date = data.get('Task_end_date')
    task_completion = data.get('Task_completion')

    if task_name:
        result = add_task(task_username, task_name, task_description, 
                          task_start_date, task_end_date, task_completion)
        if result['status'] == 'success':
            return jsonify(result), 200
        else:
            return jsonify(result), 500
    else:
        return jsonify({"message": "Invalid data provided"}), 400

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
    

@routes.route('/update_task', methods=['POST'])
def update_task():
    data = request.get_json()

    username = data.get('Username')
    task_id = data.get('TaskID')
    task_name = data.get('Task_name', None)
    task_description = data.get('Task_description', None)
    task_start_date = data.get('Task_start_date', None)
    task_end_date = data.get('Task_end_date', None)
    task_completion = data.get('Task_completion', None)

    # Call the function to update the task
    success = edit_task(username, task_id, task_name, task_description, task_start_date, task_end_date, task_completion)
    
    if success:
        return jsonify({"message": "Task updated successfully"}), 200
    else:
        return jsonify({"message": "Error updating task"}), 500