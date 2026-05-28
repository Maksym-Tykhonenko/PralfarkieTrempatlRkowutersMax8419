import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { palette, radii, spacing } from '../themeStone/palette';
import { inscription } from '../themeStone/fontPreset';

type Option = { key: string; label: string };

type Props = {
  options: Option[];
  active: string;
  onChange: (key: string) => void;
};

export const SegmentSwitch: React.FC<Props> = ({ options, active, onChange }) => {
  const activeIndex = Math.max(0, options.findIndex(o => o.key === active));
  const slider = useRef(new Animated.Value(activeIndex)).current;

  useEffect(() => {
    Animated.timing(slider, {
      toValue: activeIndex,
      duration: 320,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [activeIndex, slider]);

  return (
    <View style={styles.host}>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.thumb,
            {
              width: `${100 / options.length}%`,
              left: slider.interpolate({
                inputRange: options.map((_, i) => i),
                outputRange: options.map((_, i) => `${(100 / options.length) * i}%`),
              }),
            },
          ]}
        >
          <LinearGradient
            colors={[palette.jade, palette.jadeBright]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>
        {options.map(opt => {
          const isActive = opt.key === active;
          return (
            <Pressable key={opt.key} onPress={() => onChange(opt.key)} style={styles.option}>
              <Text
                style={[
                  inscription(11, isActive ? 'bold' : 'medium'),
                  { color: isActive ? '#06141A' : palette.parchmentSoft },
                ]}
              >
                {opt.label.toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  host: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  track: {
    flexDirection: 'row',
    backgroundColor: palette.glass,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: palette.hairlineSoft,
    padding: 4,
    height: 46,
    overflow: 'hidden',
  },
  thumb: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  option: { flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' },
});
