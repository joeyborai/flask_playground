import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export default function TodoListComponent({ todos }) {
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
    <TodoList>
      {todos?.map((todo) => (
        <TodoItem key={todo.id}>
          <TodoCheckbox
            type="checkbox"
            checked={todo.completed}
            onChange={() =>
              toggleTodoMutation.mutate({
                ...todo,
                completed: !todo.completed,
              })
            }
          />
          <TodoContent>
            <TodoTitle completed={todo.completed}>{todo.title}</TodoTitle>
            <TodoDescription>{todo.description}</TodoDescription>
          </TodoContent>
        </TodoItem>
      ))}
    </TodoList>
  );
}

TodoListComponent.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: start;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
`;

const TodoCheckbox = styled.input`
  margin-top: 0.25rem;
`;

const TodoContent = styled.div`
  flex: 1;
`;

const TodoTitle = styled.h3`
  font-weight: 500;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  color: ${props => props.completed ? '#6b7280' : 'inherit'};
`;

const TodoDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`; 