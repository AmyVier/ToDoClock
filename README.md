# ToDoClock

## Description
Add derscription here.

## Features
Add features here.

## Technologies Used
- **Backend**: Flask, Python
- **Frontend**: React, JavaScript
- **Database**: DynamoDB 
- **Backend Hosting**: EC2
- **Database Backup**: S3
- **Frontend Hosting**: Don't know yet   
- **Others**: Flask-CORS for handling cross-origin requests

## Prerequisites
Before you begin, make sure you have the following installed on your system:
- Python 3.x
- Node.js and npm
- AWS CLI 
- Git 

## Installation

### Backend (Flask)
1. go to backend folder/directory
2. create environment: python3 -m venv venv
3. activate environment: source venv/bin/activate (mac/Linux) or venv\Scripts\activate (Windows). Type deactivate to exit from environment
4. install dependencies: pip install -r requirements.txt

## Deployment (for now/edit later)
The backend and frontend both use different ports so make sure you open backend and frontend on different windows/terminals to run both sides (for now).

### Backend (Flask)
1. go to backend folder/directory
2. activate environment: source venv/bin/activate (mac/Linux) or venv\Scripts\activate (Windows). Type deactivate to exit from environment
3. run python file: python3 run.py
4. it will run on port number 8000 

### Frontend (React)
1. go to frontend folder/directory
2. run: npm start
3. it will run on port number 3000 