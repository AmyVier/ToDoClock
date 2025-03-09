"""
This file  connects with a
DynamoDB database to store and retrieve task data.
"""
import time
import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb', region_name='us-east-2') 

# edit later: may change tables
# key: Username
# attributes: Password
accountTable = dynamodb.Table('Account') 

# key: Username
# sort key: TaskID
# attributes: Task_name, Task_description, Task_start_date, 
# Task_end_date, Task_completion
# (task dates are in the format: "yyyy-mm-dd hh:mm" and Task_completion is False/True)
taskTable = dynamodb.Table('Task') 

# Function to get all tasks from DynamoDB
def get_all_tasks():
    try:
        response = taskTable.scan()  
        return response['Items']  
    except (NoCredentialsError, PartialCredentialsError) as e:
        print(f"AWS Credentials issue: {e}")
        return None
    except Exception as e:
        print(f"Error retrieving tasks: {e}")
        return None

# Function to add a new task
def add_task(username, task_name, task_description, 
             task_start_date, task_end_date, task_completion):
    task_id = f"task_{int(time.time())}"

    try:
        taskTable.put_item(Item={'Username': username, 'TaskID': task_id, 
                                 'Task_name': task_name, 'Task_description': task_description,
                                 'Task_start_date': task_start_date, 'Task_end_date': task_end_date, 
                                 'Task_completion': task_completion,})
        return {'status': 'success', 'message': 'Task added'}
    except Exception as e:
        print(f"Error adding task: {e}")
        return {'status': 'failure', 'message': str(e)}
