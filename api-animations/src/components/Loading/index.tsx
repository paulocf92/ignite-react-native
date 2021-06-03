import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

export function Loading() {
  const theme = useTheme();

  return (
    <ActivityIndicator
      color={theme.colors.main}
      size='large'
      style={{ flex: 1 }}
    />
  );
}
