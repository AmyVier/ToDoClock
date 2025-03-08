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
@routes.route('/tasks', methods=['GET'])
def tasks():
    tasks = get_all_tasks()
    if tasks is not None:
        return jsonify(tasks), 200
    else:
        return jsonify({"message": "Error fetching tasks"}), 500

# Route to add a new task to DynamoDB
# To edit later: add more attributes to task, i.e dates, etc.
@routes.route('/tasks', methods=['POST'])
def add_new_task():
    data = request.get_json()

    # to change later: attributes may be changed/deleted/added
    task_id = data.get('task_id')
    task_name = data.get('task_name')

    if task_id and task_name:
        result = add_task(task_id, task_name)
        if result['status'] == 'success':
            return jsonify(result), 200
        else:
            return jsonify(result), 500
    else:
        return jsonify({"message": "Invalid data provided"}), 400
