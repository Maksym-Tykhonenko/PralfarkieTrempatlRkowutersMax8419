import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useEntranceFade = (
  delay: number = 0,
  duration: number = 520,
  fromY: number = 16,
) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(fromY)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(translate, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, [opacity, translate, delay, duration]);

  return { opacity, translate };
};
