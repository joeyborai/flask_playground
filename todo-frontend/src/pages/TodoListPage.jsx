import styled from 'styled-components';
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

  if (isLoading) return <LoadingText>Loading...</LoadingText>;

  return (
    <PageContainer>
      <TodoListHeader />
      <NewTodo />
      <TodoList todos={todos} />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  padding: 1rem;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.125rem;
  color: #6b7280;
`; 