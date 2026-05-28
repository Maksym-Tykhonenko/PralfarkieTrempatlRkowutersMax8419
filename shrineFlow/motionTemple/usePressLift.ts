import { useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const usePressLift = (minScale: number = 0.96) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.timing(scale, {
      toValue: minScale,
      duration: 110,
      useNativeDriver: true,
      easing: Easing.out(Easing.quad),
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  return { scale, onPressIn, onPressOut };
};
