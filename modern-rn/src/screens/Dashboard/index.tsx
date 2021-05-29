import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreetings,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  LoadingContainer,
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  income: HighlightProps;
  expenses: HighlightProps;
  total: HighlightProps;
}

function getLastTransactionDate(
  collection: DataListProps[],
  type: 'positive' | 'negative'
) {
  const lastTransaction = new Date(
    Math.max.apply(
      Math,
      collection
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime())
    )
  );

  return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
    'pt-BR',
    { month: 'long' }
  )}`;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  const { user, signOut } = useAuth();
  const theme = useTheme();

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';

    const response = await AsyncStorage.getItem(dataKey);
    const parsedTransactions = response ? JSON.parse(response) : [];

    let incomeTotal = 0;
    let expenseTotal = 0;

    const transactionsFormatted: DataListProps[] = parsedTransactions.map(
      (transaction: DataListProps) => {
        if (transaction.type === 'positive') {
          incomeTotal += Number(transaction.amount);
        } else {
          expenseTotal += Number(transaction.amount);
        }

        const amount = Number(transaction.amount)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
          .replace(/\$(\d)/, '$ $1');

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(transaction.date));

        return {
          ...transaction,
          amount,
          date,
        };
      }
    );

    setTransactions(transactionsFormatted);

    const lastIncomeTransaction = getLastTransactionDate(
      parsedTransactions,
      'positive'
    );

    const lastExpenseTransaction = getLastTransactionDate(
      parsedTransactions,
      'negative'
    );

    const totalInterval = `01 à ${lastExpenseTransaction}`;

    setHighlightData({
      income: {
        amount: incomeTotal
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
          .replace(/\$(\d)/, '$ $1'),
        lastTransaction: `Última entrada ${lastIncomeTransaction}`,
      },
      expenses: {
        amount: expenseTotal
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
          .replace(/\$(\d)/, '$ $1'),
        lastTransaction: `Última saída ${lastExpenseTransaction}`,
      },
      total: {
        amount: (incomeTotal - expenseTotal)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
          .replace(/\$(\d)/, '$ $1'),
        lastTransaction: totalInterval,
      },
    });

    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size='large' />
        </LoadingContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreetings>Hi,</UserGreetings>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={signOut}>
                <Icon name='power' />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type='up'
              title='Entradas'
              amount={highlightData.income.amount}
              lastTransaction={highlightData.income.lastTransaction}
            />
            <HighlightCard
              type='down'
              title='Saídas'
              amount={highlightData.expenses.amount}
              lastTransaction={highlightData.expenses.lastTransaction}
            />
            <HighlightCard
              type='total'
              title='Total'
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
