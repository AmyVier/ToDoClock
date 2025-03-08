"""
This file  connects with a
DynamoDB database to store and retrieve task data.
"""
import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb', region_name='us-east-2') 

# edit later: may include more tables
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
# For now: the task only has name and ID
# To edit later: add more attributes to task, i.e dates, etc.
def add_task(task_id, task_name):
    try:
        taskTable.put_item(Item={'TaskID': task_id, 'name': task_name})
        return {'status': 'success', 'message': 'Task added'}
    except Exception as e:
        print(f"Error adding task: {e}")
        return {'status': 'failure', 'message': str(e)}
