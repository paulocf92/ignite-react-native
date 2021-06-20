import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

export function SignUpFirstStep() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
        <Steps>
          <Bullet active />
          <Bullet />
        </Steps>
      </Header>

      <Title>Crie sua{'\n'}conta</Title>
      <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil</SubTitle>

      <Form>
        <FormTitle>1. Dados</FormTitle>
      </Form>
    </Container>
  );
}
