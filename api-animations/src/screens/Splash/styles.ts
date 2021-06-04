import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.header};
`;
