from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
	return "Welcome to To-Do Clock!"

@app.route('/clock-view')
def clock_view():
	return "Clock view + button to add task"

@app.route('/task-list')
def task_list_view():
	return "List of tasks + button to add task"

@app.route('/add-task')
def add_task():
	return "Adding a task and all features to go along with it"

if __name__ == "__main__":
	app.run(debug=True, host='0.0.0.0', port=3000)
