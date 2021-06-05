import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { format, parseISO } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { getPlatformDate } from '../../utils/getPlatformDate';

import ArrowSvg from '../../assets/arrow.svg';
import { CarDTO } from '../../dtos/CarDTO';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import {
  Calendar,
  DayProps,
  MarkedDateProps,
  generateInterval,
} from '../../components/Calendar';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { car } = route.params as Params;

  function handleConfirmRentalDetails() {
    // if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
    //   Alert.alert('Selecione o intervalo para alugar!');
    //   return;
    // }

    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);

    setMarkedDates(interval);

    const firstDate = parseISO(Object.keys(interval)[0]);
    const lastDate = parseISO(
      Object.keys(interval)[Object.keys(interval).length - 1]
    );

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        'dd/MM/yyyy'
      ),
      endFormatted: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy'),
    });
  }

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />

      <Header>
        <BackButton onPress={handleGoBack} color={theme.colors.shape} />

        <Title>
          Escolha uma{'\n'}data de início e{'\n'}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDate={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title='Confirmar'
          onPress={handleConfirmRentalDetails}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
}
