import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { palette, spacing } from '../themeStone/palette';
import { inscription } from '../themeStone/fontPreset';
import { tabSpecs } from './tabRegistry';
import type { JourneyTab } from './journeyContext';
import { TAB_BAR_ITEM_HEIGHT, TAB_BAR_PAD_TOP, useTabBarMetrics } from './tabBarMetrics';

type Props = {
  active: JourneyTab;
  onChange: (tab: JourneyTab) => void;
};

const TabItem: React.FC<{
  spec: (typeof tabSpecs)[number];
  active: boolean;
  onPress: () => void;
}> = ({ spec, active, onPress }) => {
  const anim = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: active ? 1 : 0,
      duration: 280,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.cubic),
    }).start();
  }, [active, anim]);

  const translate = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -4] });
  const color = active ? palette.jadeBright : palette.fogBlue;

  return (
    <Pressable onPress={onPress} style={styles.item} hitSlop={6}>
      <Animated.View style={[styles.iconRow, { transform: [{ translateY: translate }] }]}>
        {spec.icon({ color, size: 22 })}
      </Animated.View>
      <Text style={[inscription(9, active ? 'bold' : 'medium'), { color, marginTop: 4 }]}>
        {spec.label.toUpperCase()}
      </Text>
      {active && (
        <Animated.View
          style={[
            styles.dot,
            { opacity: anim, transform: [{ scale: anim }] },
          ]}
        />
      )}
    </Pressable>
  );
};

export const BottomConstellation: React.FC<Props> = ({ active, onChange }) => {
  const tabBar = useTabBarMetrics();
  return (
    <View
      style={[
        styles.host,
        { paddingBottom: tabBar.padBottom },
      ]}
    >
      <LinearGradient
        colors={['rgba(4,8,20,0)', 'rgba(4,8,20,0.85)', 'rgba(4,8,20,0.98)']}
        style={StyleSheet.absoluteFill}
        locations={[0, 0.3, 1]}
      />
      <View style={styles.row}>
        {tabSpecs.map(spec => (
          <TabItem
            key={spec.key}
            spec={spec}
            active={active === spec.key}
            onPress={() => onChange(spec.key)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: TAB_BAR_PAD_TOP,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: TAB_BAR_ITEM_HEIGHT,
  },
  iconRow: { alignItems: 'center', justifyContent: 'center' },
  dot: {
    position: 'absolute',
    top: 0,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.jadeBright,
    shadowColor: palette.jadeBright,
    shadowOpacity: 0.9,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    ...Platform.select({ android: { elevation: 4 } }),
  },
});
