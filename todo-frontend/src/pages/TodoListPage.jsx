import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TodoListHeader from '../components/TodoListHeader';
import NewTodo from '../components/NewTodo';
import TodoList from '../components/TodoList';

const API_URL = 'http://localhost:5000';

export default function TodoListPage() {
  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/todos`);
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <TodoListHeader />
      <NewTodo />
      <TodoList todos={todos} />
    </div>
  );
} 