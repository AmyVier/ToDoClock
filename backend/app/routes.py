"""
This file contains the backend routes for the Flask application.

It includes all the API routes.

Routes:
- GET /tasks: Retrieve all tasks from the database
- POST /tasks: Add a new task to the database

This file should be executed in a Flask environment.
"""

from flask import Blueprint, request, jsonify
from .dynamodb import get_all_tasks, add_task 

# Initialize a Flask blueprint for routing
routes = Blueprint('routes', __name__)

# Route to get all tasks from DynamoDB
# Response Body: Username, TaskID, Task_name, Task_description, Task_start_date, 
# Task_end_date, Task_completion
# (task dates are in the format: "yyyy-mm-dd hh:mm" and Task_completion is False/True)
@routes.route('/tasks', methods=['GET'])
def tasks():
    tasks = get_all_tasks()
    if tasks is not None:
        return jsonify(tasks), 200
    else:
        return jsonify({"message": "Error fetching tasks"}), 500

# Route to add a new task to DynamoDB
# Request Body: Username, TaskID, Task_name, Task_description, Task_start_date, 
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
