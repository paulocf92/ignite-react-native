import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

interface Props extends RectButtonProps {
  data: CarDTO;
}

export function Car({ data, ...rest }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${data.price}`}</Price>
          </Rent>

          <Type>
            <MotorIcon fill='#41414D' />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode='contain'
      />
    </Container>
  );
}
