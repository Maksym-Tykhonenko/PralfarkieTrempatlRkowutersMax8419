import React from 'react';
import { Animated, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { palette, radii } from '../themeStone/palette';
import { usePressLift } from '../motionTemple/usePressLift';

type Props = {
  onPress: () => void;
  children: React.ReactNode;
  size?: number;
  style?: ViewStyle | ViewStyle[];
  variant?: 'glass' | 'jade';
};

export const RoundIconButton: React.FC<Props> = ({ onPress, children, size = 38, style, variant = 'glass' }) => {
  const { scale, onPressIn, onPressOut } = usePressLift(0.92);
  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress} hitSlop={8}>
      <Animated.View
        style={[
          styles.host,
          variant === 'jade' && styles.jade,
          { width: size, height: size, borderRadius: size / 2, transform: [{ scale }] },
          style,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  host: {
    backgroundColor: 'rgba(4,8,20,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.hairlineSoft,
    borderRadius: radii.pill,
  },
  jade: {
    backgroundColor: 'rgba(95,189,167,0.18)',
    borderColor: palette.jadeBright,
  },
});
