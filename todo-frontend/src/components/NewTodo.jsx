import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export default function NewTodo() {
  const queryClient = useQueryClient();
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');

  const createTodoMutation = useMutation({
    mutationFn: async (newTodo) => {
      const { data } = await axios.post(`${API_URL}/todos`, newTodo);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setNewTodoTitle('');
      setNewTodoDescription('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodoMutation.mutate({
      title: newTodoTitle,
      description: newTodoDescription,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Todo title"
          className="border p-2 rounded flex-1"
        />
        <input
          type="text"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
          placeholder="Todo description"
          className="border p-2 rounded flex-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
} 