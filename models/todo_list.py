from dataclasses import dataclass

from models.todo import Todo


class TodoNode():
    def __init__(self, todo: Todo, next_node: 'TodoNode' = None, prev_node: 'TodoNode' = None):
        self.todo = todo
        self.next = next_node
        self.prev = prev_node


@dataclass
class TodoList:
    def __init__(self):
        self.todo_map = {}
        self.head = None
        self.tail = None

    def _remove_node_from_dll(self, node: TodoNode):
        if node.prev:
            node.prev.next = node.next
        else:
            self.head = node.next
        if node.next:
            node.next.prev = node.prev
        else:
            self.tail = node.prev

    def add_todo(self, todo: Todo):
        new_node = TodoNode(todo)
        self.todo_map[todo.id] = new_node

        if not self.head:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node

    def get_todo(self, id: int):
        node = self.todo_map.get(id)
        return node.todo if node else None

    def update_todo(self, id: int, todo: Todo):
        if todo.id != id:
            raise ValueError("Todo ID does not match")

        if id not in self.todo_map:
            raise ValueError("Todo not found")

        self.todo_map[id].todo = todo

    def delete_todo(self, id: int):
        node = self.todo_map.get(id)
        if not node:
            return

        self._remove_node_from_dll(node)
        del self.todo_map[id]

    def get_all_todos(self) -> list[Todo]:
        todos = []
        current = self.head
        while current:
            todos.append(current.todo)
            current = current.next
        return todos

    def move_todo_after(self, todo_id: int, marker_todo_id: int | None):
        # Get the node to move
        node = self.todo_map.get(todo_id)
        if not node:
            raise ValueError("Todo not found")

        # If marker_todo_id is provided, validate it exists
        marker_node = None
        if marker_todo_id is not None:
            marker_node = self.todo_map.get(marker_todo_id)
            if not marker_node:
                raise ValueError("Marker todo not found")
            if marker_node == node:
                return  # No need to move if same node

        self._remove_node_from_dll(node)

        # If marker_todo_id is None, move to front
        if marker_node is None:
            node.next = self.head
            node.prev = None
            if self.head:
                self.head.prev = node
            self.head = node
            if not self.tail:
                self.tail = node
        else:
            # Insert after marker node
            node.next = marker_node.next
            node.prev = marker_node
            marker_node.next = node
            if node.next:
                node.next.prev = node
            else:
                self.tail = node
