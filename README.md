# ToDoClock

## Description
The To-Do Clock is a website that allows users to set tasks that they need to do for the day. The website organizes the tasks in a 24-hour clock interface that enables the user to see how their tasks are arranged for the day.

## Features
- Create an account
- Sign in with an account
- Add and delete tasks
- See the tasks in an clock-esque manner

## Technologies Used
- **Backend**: Flask, Python
- **Frontend**: React, JavaScript
- **Database**: DynamoDB 
- **Backend Hosting**: EC2
- **Database Backup**: S3 (storing), Lambda (function to invoke backup), Amazon EventBridge (to periodically invoke backup functions)
- **Others**: Flask-CORS for handling cross-origin requests, Bootstrap for UI, tmux to keep backend running on EC2

## Prerequisites
Before you begin, make sure you have the following installed on your system:
- Node.js and npm
- Git 

## Deployment 

### Backend (Flask)
The backend application is already running on EC2 using tmux.

### Frontend (React)
1. go to frontend folder/directory
2. run: npm install (just initially to install dependencies)
3. run: npm start
4. it will run on port number 3000 
