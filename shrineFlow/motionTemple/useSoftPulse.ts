import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useSoftPulse = (
  enabled: boolean = true,
  duration: number = 2400,
  amplitude: number = 0.18,
) => {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!enabled) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: duration / 2,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse, enabled, duration]);

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1 + amplitude] });
  const opacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });
  return { pulse, scale, opacity };
};
