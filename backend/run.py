"""
This file runs the Flask application.

Make sure to enter environment before running.
"""

from app import app

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
