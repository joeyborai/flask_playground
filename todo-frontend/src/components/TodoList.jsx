import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export default function TodoList({ todos }) {
  const queryClient = useQueryClient();

  const toggleTodoMutation = useMutation({
    mutationFn: async (todo) => {
      const { data } = await axios.put(`${API_URL}/todos/${todo.id}`, todo);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    <ul className="space-y-4">
      {todos?.map((todo) => (
        <li
          key={todo.id}
          className="flex items-start gap-2 p-4 border rounded"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() =>
              toggleTodoMutation.mutate({
                ...todo,
                completed: !todo.completed,
              })
            }
            className="mt-1"
          />
          <div>
            <h3
              className={`font-medium ${
                todo.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {todo.title}
            </h3>
            <p className="text-gray-600 text-sm">{todo.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
} 