import styled from 'styled-components';

export default function TodoListHeaderComponent() {
  return (
    <Header>
      <Title>Todo List</Title>
    </Header>
  );
}

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
`; 