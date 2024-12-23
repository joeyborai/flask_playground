import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export default function NewTodoComponent() {
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
    <NewTodoForm onSubmit={handleSubmit}>
      <InputContainer>
        <TodoInput
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Todo title"
        />
        <TodoInput
          type="text"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
          placeholder="Todo description"
        />
        <AddButton type="submit">
          Add Todo
        </AddButton>
      </InputContainer>
    </NewTodoForm>
  );
}

const NewTodoForm = styled.form`
  margin-bottom: 2rem;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TodoInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
`;

const AddButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`; 