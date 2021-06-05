import React from 'react';

import { Container, Title, Amount } from './styles';

interface Props {
  color: string;
  title: string;
  amount: string;
}

export function HistoryCard({ color, title, amount }: Props) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}
