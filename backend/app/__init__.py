"""
This file sets up Flask application with CORS and routes.
"""

from flask import Flask
from flask_cors import CORS
from .routes import routes  

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for the entire app
CORS(app)  

# Register blueprint for routes
app.register_blueprint(routes)