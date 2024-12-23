from flask import Flask

app = Flask(__name__)

@app.get('/')
def index():
    return "Hello, World!"


@app.get('/todos')
def get_todos():
    return "TODOs"


@app.post('/todos')
def create_todo():
    return "TODO created"


@app.get('/todos/<int:id>')
def get_todo(id):
    return f"TODO {id}"


@app.put('/todos/<int:id>')
def update_todo(id):
    return f"TODO {id} updated"


@app.delete('/todos/<int:id>')
def delete_todo(id):
    return f"TODO {id} deleted"


if __name__ == '__main__':
    app.run(debug=True)
