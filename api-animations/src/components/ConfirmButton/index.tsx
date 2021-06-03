import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
}

export function ConfirmButton({ title }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}
