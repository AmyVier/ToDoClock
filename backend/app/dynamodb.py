"""
This file  connects with a
DynamoDB database to store and retrieve task data.
"""
import time
from datetime import datetime
import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError, ClientError


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

def get_user(username, password):
    try:
        response = accountTable.scan(
            FilterExpression='Username = :username and Password = :password',
            ExpressionAttributeValues={
                ':username': username,
                ':password': password
            }
        )
        items = response.get('Items', [])
        return True if items else False
    except Exception as e:
        print(f"Error fetching user: {e}")
        return None

def add_user(username, password):
    try:
        # Insert a new item with the username and password
        response = accountTable.put_item(
            Item={
                'Username': username,  # Primary key attribute
                'Password': password   # Store password (ensure to hash it in production)
            }, ConditionExpression="attribute_not_exists(Username)"
        )
        print(f"User {username} added successfully!")
        return response
    except ClientError as e:
        if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
            print(f"User {username} already exists!")
        else:
            print(f"Error adding user: {e}")
        return None
    except (NoCredentialsError, PartialCredentialsError) as e:
        print(f"AWS Credentials issue: {e}")
        return None
    except Exception as e:
        print(f"Error adding user: {e}")
        return None

# Function to get all tasks from DynamoDB
def get_all_tasks(username):
    try:
        response = taskTable.scan(
            FilterExpression='Username = :username',
            ExpressionAttributeValues={':username': username}
        )

        tasks = response['Items']

        tasks.sort(key=lambda x: datetime.strptime(x['Task_start_date'], '%H:%M'))

        return tasks  
    except (NoCredentialsError, PartialCredentialsError) as e:
        print(f"AWS Credentials issue: {e}")
        return None
    except Exception as e:
        print(f"Error retrieving tasks: {e}")
        return None

def check_time_overlap(start1, end1, start2, end2):
    """
    Helper function to check if two time periods overlap.
    Returns True if there is an overlap, otherwise False.
    """
    return not (end1 <= start2 or end2 <= start1)


# Function to add a new task
def add_task(username, task_name, task_description, 
             task_start_date, task_end_date, task_completion):
    task_id = f"task_{int(time.time())}"

    try:
        start_time = datetime.strptime(task_start_date, '%H:%M')
        end_time = datetime.strptime(task_end_date, '%H:%M')
    except ValueError as e:
        return {'status': 'failure', 'message': f"Error parsing time: {e}"}
    
    try: 
        response = taskTable.scan(
            FilterExpression='Username = :username',
            ExpressionAttributeValues={':username': username}
        )
        existing_tasks = response['Items']
        for existing_task in existing_tasks:
            existing_start_time = datetime.strptime(existing_task['Task_start_date'], '%H:%M')
            existing_end_time = datetime.strptime(existing_task['Task_end_date'], '%H:%M')

            # If there's an overlap, return failure
            if check_time_overlap(start_time, end_time, existing_start_time, existing_end_time):
                return {'status': 'failure', 'message': 'Task time overlaps with an existing task'}
            
        taskTable.put_item(Item={'Username': username, 'TaskID': task_id, 
                                 'Task_name': task_name, 'Task_description': task_description,
                                 'Task_start_date': task_start_date, 'Task_end_date': task_end_date, 
                                 'Task_completion': task_completion,})
        return {'status': 'success', 'message': 'Task added'}
    except Exception as e:
        print(f"Error adding task: {e}")
        return {'status': 'failure', 'message': str(e)}

def delete_task(username, task_id):
    try:
        # Perform the delete operation
        response = taskTable.delete_item(
            Key={
                'Username': username,  # Partition Key
                'TaskID': task_id     # Sort Key
            }
        )
        # Check if the item was actually deleted
        if response.get('ResponseMetadata', {}).get('HTTPStatusCode') == 200:
            return True
        else:
            print("Failed to delete task, response:", response)
            return False
    except (NoCredentialsError, PartialCredentialsError) as e:
        print(f"AWS Credentials issue: {e}")
        return False
    except Exception as e:
        print(f"Error deleting task: {e}")
        return False

def edit_task(username, task_id, task_name, task_description, task_start_date, task_end_date, task_completion):
    try:
        # Prepare the update expression and expression attribute values
        update_expression = "SET "
        expression_attribute_values = {}

        if task_name is not None:
            update_expression += "Task_name = :task_name, "
            expression_attribute_values[":task_name"] = task_name
        if task_description is not None:
            update_expression += "Task_description = :task_description, "
            expression_attribute_values[":task_description"] = task_description
        if task_start_date is not None:
            update_expression += "Task_start_date = :task_start_date, "
            expression_attribute_values[":task_start_date"] = task_start_date
        if task_end_date is not None:
            update_expression += "Task_end_date = :task_end_date, "
            expression_attribute_values[":task_end_date"] = task_end_date
        if task_completion is not None:
            update_expression += "Task_completion = :task_completion, "
            expression_attribute_values[":task_completion"] = task_completion

        # Remove the last comma and space
        update_expression = update_expression.rstrip(", ")

        # Perform the update operation
        response = taskTable.update_item(
            Key={
                'Username': username,
                'TaskID': task_id
            },
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values,
            ReturnValues="ALL_NEW"  # To return the updated attributes
        )

        # Check if the task was successfully updated
        if response.get('ResponseMetadata', {}).get('HTTPStatusCode') == 200:
            return True
        else:
            return False

    except Exception as e:
        print(f"Error updating task: {e}")
        return False