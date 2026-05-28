import React from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { palette, radii } from '../themeStone/palette';
import { inscription } from '../themeStone/fontPreset';
import { usePressLift } from '../motionTemple/usePressLift';

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export const CategoryChip: React.FC<Props> = ({ label, active, onPress }) => {
  const { scale, onPressIn, onPressOut } = usePressLift(0.95);

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
      <Animated.View
        style={[
          styles.host,
          active ? styles.activeHost : styles.idleHost,
          { transform: [{ scale }] },
        ]}
      >
        {active && (
          <LinearGradient
            colors={[palette.jade, palette.jadeBright]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        )}
        <Text
          style={[
            inscription(11, active ? 'bold' : 'medium'),
            { color: active ? '#06141A' : palette.parchmentSoft },
          ]}
        >
          {label.toUpperCase()}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  host: {
    paddingHorizontal: 16,
    height: 38,
    borderRadius: radii.chip,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  idleHost: {
    backgroundColor: palette.glass,
    borderWidth: 1,
    borderColor: palette.hairlineSoft,
  },
  activeHost: {
    borderWidth: 1,
    borderColor: palette.jadeBright,
  },
});
