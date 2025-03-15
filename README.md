# ToDoClock

## Description
The To-Do Clock is a website that allows users to set tasks that they need to do for the day. The website organizes the tasks in a 24-hour clock interface that enables the user to see how their tasks are arranged for the day and whether they have been completed.

## Features
Add features here.

## Technologies Used
- **Backend**: Flask, Python
- **Frontend**: React, JavaScript
- **Database**: DynamoDB 
- **Backend Hosting**: EC2
- **Database Backup**: S3 (storing), Lambda (function to invoke backup), Amazon EventBridge (to periodically invoke backup functions)
- **Frontend Hosting**: Don't know yet   
- **Others**: Flask-CORS for handling cross-origin requests, Bootstrap for UI, tmux to keep backend running on EC2

## Prerequisites
Before you begin, make sure you have the following installed on your system:
- Python 3.x
- Node.js and npm
- AWS CLI 
- Git 

## Deployment 

### Frontend (React)
1. go to frontend folder/directory
2. run: npm install
3. run: npm start
4. it will run on port number 3000 
