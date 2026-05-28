import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { palette, spacing } from '../themeStone/palette';
import { bodyText, inscription } from '../themeStone/fontPreset';
import { useShimmerSpin } from '../motionTemple/useShimmerSpin';

type Props = { onDone: () => void };

const RING_COUNT = 3;
const PARTICLE_COUNT = 14;

const Particle: React.FC<{ index: number }> = ({ index }) => {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, {
          toValue: 1,
          duration: 2400 + (index * 90) % 1200,
          delay: (index * 130) % 900,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }),
        Animated.timing(v, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [v, index]);

  const angle = (index / PARTICLE_COUNT) * Math.PI * 2;
  const radius = 80 + (index % 3) * 22;
  const dx = Math.cos(angle) * radius;
  const dy = Math.sin(angle) * radius;

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          opacity: v.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, 1, 0] }),
          transform: [
            { translateX: v.interpolate({ inputRange: [0, 1], outputRange: [0, dx] }) },
            { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, dy] }) },
            { scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1.1] }) },
          ],
        },
      ]}
    />
  );
};

const Ring: React.FC<{ ringIndex: number }> = ({ ringIndex }) => {
  const { rotate } = useShimmerSpin(true, 7000 + ringIndex * 2200);
  const size = 130 + ringIndex * 38;
  return (
    <Animated.View
      style={[
        styles.ring,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          transform: [{ rotate: ringIndex % 2 === 0 ? rotate : '0deg' }, { rotateZ: '0deg' }],
        },
      ]}
    />
  );
};

export const LoadingShrine: React.FC<Props> = ({ onDone }) => {
  const fade = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;
  const ornament = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fade, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(ornament, {
        toValue: 1,
        duration: 1800,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 500,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, 31500);

    return () => clearTimeout(timer);
  }, [fade, fadeOut, ornament, onDone]);

  return (
    <Animated.View style={[styles.host, { opacity: fadeOut }]}>
      <LinearGradient
        colors={[palette.voidDeep, palette.voidMid, palette.voidDeep]}
        style={StyleSheet.absoluteFill}
      />
      {/* Light ray */}
      <Animated.View
        style={[
          styles.ray,
          {
            opacity: ornament.interpolate({ inputRange: [0, 1], outputRange: [0, 0.25] }),
          },
        ]}
      >
        <LinearGradient
          colors={['rgba(95,189,167,0)', 'rgba(95,189,167,0.55)', 'rgba(95,189,167,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <Animated.View style={[styles.glyphHost, { opacity: fade }]}>
        {Array.from({ length: RING_COUNT }).map((_, i) => (
          <View key={i} style={styles.ringSlot}>
            <Ring ringIndex={i} />
          </View>
        ))}
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}
        <View style={styles.coreWrap}>
          <View style={styles.coreOuter} />
          <View style={styles.coreInner} />
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.captionWrap,
          {
            opacity: fade,
            transform: [
              {
                translateY: fade.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }),
              },
            ],
          },
        ]}
      >
        <Text style={[inscription(12, 'medium'), styles.kicker]}>SACRED ATLAS</Text>
        <Text style={[inscription(28, 'bold'), styles.title]}>TEMPLE ROUTES</Text>
        <Text style={[bodyText(13, 'regular'), styles.caption]}>
          Awakening the ancient archive…
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  host: {
    flex: 1,
    backgroundColor: palette.voidDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ray: {
    position: 'absolute',
    width: '300%',
    height: 320,
    top: '30%',
    transform: [{ rotate: '-25deg' }],
  },
  glyphHost: {
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringSlot: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  ring: {
    borderWidth: 1,
    borderColor: 'rgba(95,189,167,0.35)',
    borderStyle: 'solid',
    borderTopColor: palette.jadeBright,
    borderRightColor: palette.emberGold,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.emberGold,
    shadowColor: palette.emberGold,
    shadowOpacity: 0.9,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
  coreWrap: { alignItems: 'center', justifyContent: 'center' },
  coreOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(95,189,167,0.15)',
    borderWidth: 1,
    borderColor: palette.jadeBright,
    position: 'absolute',
  },
  coreInner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: palette.jadeBright,
    shadowColor: palette.jadeBright,
    shadowOpacity: 0.9,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
  },
  captionWrap: {
    position: 'absolute',
    bottom: '14%',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  kicker: { color: palette.emberGold, letterSpacing: 5, marginBottom: 10 },
  title: { color: palette.parchment, letterSpacing: 4 },
  caption: { color: palette.fogSoft, marginTop: 14, letterSpacing: 1.2 },
});
