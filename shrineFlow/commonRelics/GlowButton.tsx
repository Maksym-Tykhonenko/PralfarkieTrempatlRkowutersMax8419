import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { palette, radii, shadows } from '../themeStone/palette';
import { inscription } from '../themeStone/fontPreset';
import { usePressLift } from '../motionTemple/usePressLift';
import { useSoftPulse } from '../motionTemple/useSoftPulse';

type Variant = 'jade' | 'ember' | 'ghost';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  icon?: React.ReactNode;
  glow?: boolean;
  compact?: boolean;
};

export const GlowButton: React.FC<Props> = ({
  label,
  onPress,
  variant = 'jade',
  disabled,
  style,
  icon,
  glow = true,
  compact = false,
}) => {
  const { scale, onPressIn, onPressOut } = usePressLift(0.97);
  const { scale: pulseScale, opacity: pulseOpacity } = useSoftPulse(glow && !disabled, 2800, 0.06);

  const colors =
    variant === 'jade'
      ? [palette.jade, palette.jadeBright]
      : variant === 'ember'
      ? [palette.emberAmber, palette.emberGold]
      : ['rgba(20,32,58,0.7)', 'rgba(20,32,58,0.4)'];

  const labelColor = variant === 'ghost' ? palette.parchment : '#06141A';

  return (
    <Pressable
      disabled={disabled}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={style}
    >
      <Animated.View style={[styles.host, compact && styles.compact, { transform: [{ scale }] }]}>
        {glow && variant !== 'ghost' && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.haze,
              {
                backgroundColor: variant === 'jade' ? palette.jadeBright : palette.emberGold,
                opacity: pulseOpacity,
                transform: [{ scale: pulseScale }],
              },
            ]}
          />
        )}
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {variant === 'ghost' && <View style={styles.ghostBorder} pointerEvents="none" />}
        <View style={styles.content}>
          {icon}
          <Text style={[inscription(compact ? 12 : 13, 'bold'), { color: labelColor }]}>
            {label.toUpperCase()}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  host: {
    height: 56,
    borderRadius: radii.pill,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.glow,
  },
  compact: { height: 44 },
  haze: {
    position: 'absolute',
    left: -20,
    right: -20,
    top: -20,
    bottom: -20,
    borderRadius: radii.pill,
    opacity: 0.25,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
  },
  ghostBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: palette.hairline,
  },
});
