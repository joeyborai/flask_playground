from flask import Flask, request
from http import HTTPStatus
from flask_cors import CORS

from models.todo_list import TodoList
from models.todo import Todo

app = Flask(__name__)
CORS(app)

todo_list = TodoList()


@app.get('/')
def index():
    return "Hello, World!"


@app.get('/todos')
def get_todos():
    return todo_list.get_all_todos()


@app.post('/todos')
def create_todo():
    post_data = request.get_json()

    todo_id = todo_list.get_next_id()
    todo = Todo(
        id=todo_id,
        title=post_data['title'],
        description=post_data['description'],
        completed=False
    )
    todo_list.add_todo(todo)

    return todo.to_json()


@app.get('/todos/<int:id>')
def get_todo(id):
    return todo_list.get_todo(id).to_json()


@app.put('/todos/<int:id>')
def update_todo(id):
    post_data = request.get_json()

    todo = Todo(
        id=id,
        title=post_data['title'],
        description=post_data['description'],
        completed=post_data['completed']
    )
    todo_list.update_todo(id, todo)

    return todo.to_json()


@app.delete('/todos/<int:id>')
def delete_todo(id):
    todo_list.delete_todo(id)

    return todo_list.get_all_todos()


@app.put('/todos/<int:id>/move/<int:marker_id>')
def move_todo(id, marker_id):
    if marker_id == 0:
        marker_id = None
    todo_list.move_todo_after(id, marker_id)

    return todo_list.get_all_todos()


if __name__ == '__main__':
    app.run(debug=True)
