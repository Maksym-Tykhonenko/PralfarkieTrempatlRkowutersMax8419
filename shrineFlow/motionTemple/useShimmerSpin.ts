import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useShimmerSpin = (enabled: boolean = true, duration: number = 4200) => {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!enabled) return;
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    );
    loop.start();
    return () => {
      loop.stop();
      spin.setValue(0);
    };
  }, [spin, enabled, duration]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  return { spin, rotate };
};
