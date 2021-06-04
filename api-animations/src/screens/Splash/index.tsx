import React from 'react';
import { Button, Dimensions, StatusBar, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { Container } from './styles';

const width = Dimensions.get('window').width;

export function Splash() {
  const animation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animation.value, {
            duration: 500,
            easing: Easing.bounce,
          }),
        },
      ],
    };
  });

  function handleAnimationPosition() {
    animation.value = Math.random() * (width - 100);
  }

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />

      <Animated.View style={[styles.box, animatedStyles]} />

      <Button title='Mover' onPress={handleAnimationPosition} />
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});
