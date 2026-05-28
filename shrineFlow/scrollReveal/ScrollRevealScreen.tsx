import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ChevronRight } from 'lucide-react-native';
import { categoryAccents, palette, radii, shadows, spacing } from '../themeStone/palette';
import { bodyText, inscription } from '../themeStone/fontPreset';
import { HeaderInscription } from '../commonRelics/HeaderInscription';
import { GlowButton } from '../commonRelics/GlowButton';
import { sacredSiteList, SiteRecord } from '../routeArchive/categoryRegistry';
import { useJourney } from '../journeyShell/journeyContext';
import { useShimmerSpin } from '../motionTemple/useShimmerSpin';

type Phase = 'idle' | 'consulting' | 'revealed';

const VASE = require('../../ritrupligsmtreu/wakza.png');
const PARTICLE_COUNT = 16;

const RevealParticle: React.FC<{ index: number; active: boolean }> = ({ index, active }) => {
  const v = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) {
      v.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay((index * 90) % 800),
        Animated.timing(v, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(v, { toValue: 0, duration: 0, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [active, v, index]);

  const angle = (index / PARTICLE_COUNT) * Math.PI * 2;
  const r = 110 + (index % 4) * 20;
  const dx = Math.cos(angle) * r;
  const dy = Math.sin(angle) * r;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.particle,
        {
          opacity: v.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 1, 0] }),
          transform: [
            { translateX: v.interpolate({ inputRange: [0, 1], outputRange: [0, dx] }) },
            { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, dy] }) },
            { scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.2] }) },
          ],
        },
      ]}
    />
  );
};

export const ScrollRevealScreen: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [pick, setPick] = useState<SiteRecord | null>(null);
  const { openSite } = useJourney();

  const wobble = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const { rotate } = useShimmerSpin(phase === 'consulting', 1800);

  const startReveal = () => {
    if (phase === 'consulting') return;
    setPhase('consulting');
    cardAnim.setValue(0);
    wobble.setValue(0);

    Animated.loop(
      Animated.sequence([
        Animated.timing(wobble, { toValue: 1, duration: 140, useNativeDriver: true }),
        Animated.timing(wobble, { toValue: -1, duration: 140, useNativeDriver: true }),
      ]),
    ).start();

    setTimeout(() => {
      const next = sacredSiteList[Math.floor(Math.random() * sacredSiteList.length)];
      wobble.stopAnimation();
      wobble.setValue(0);
      setPick(next);
      setPhase('revealed');
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, 2400);
  };

  const handleAgain = () => {
    setPick(null);
    setPhase('idle');
  };

  const wobbleDeg = wobble.interpolate({ inputRange: [-1, 1], outputRange: ['-4deg', '4deg'] });
  const cardTranslate = cardAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] });

  return (
    <View style={styles.host}>
      <HeaderInscription
        label="Scroll Pick"
        title="Scroll Pick"
        subtitle="Unveil a sacred place from the ancient archive"
      />

      <View style={styles.center}>
        <View style={styles.vaseHost}>
          {phase === 'consulting' && (
            <Animated.View
              pointerEvents="none"
              style={[styles.ringSpin, { transform: [{ rotate }] }]}
            />
          )}
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
            <RevealParticle key={i} index={i} active={phase === 'consulting'} />
          ))}
          <Animated.View
            style={{
              transform: [
                { rotate: wobbleDeg },
                {
                  scale: cardAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, phase === 'revealed' ? 0.78 : 1],
                  }),
                },
              ],
            }}
          >
            <Image source={VASE} style={styles.vase} resizeMode="contain" />
          </Animated.View>
        </View>

        {phase !== 'revealed' && (
          <View style={styles.caption}>
            <Text style={[bodyText(13, 'regular'), styles.captionText]}>
              {phase === 'consulting'
                ? 'Consulting the scroll...'
                : 'The ancient archive holds ten sacred routes.\nLet the scroll reveal one path for your contemplation.'}
            </Text>
          </View>
        )}

        {phase === 'revealed' && pick && (
          <Animated.View
            style={[
              styles.resultCard,
              {
                opacity: cardAnim,
                transform: [{ translateY: cardTranslate }],
              },
            ]}
          >
            <LinearGradient
              colors={['#101A32', '#0A1224']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <Image source={pick.image} style={styles.resultImage} />
            <LinearGradient
              colors={['rgba(4,8,20,0.1)', 'rgba(4,8,20,0.95)']}
              style={styles.resultGradient}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            />
            <View style={styles.resultBody}>
              <View
                style={[
                  styles.badge,
                  { borderColor: categoryAccents[pick.category] ?? palette.jadeBright },
                ]}
              >
                <Text
                  style={[
                    inscription(10, 'bold'),
                    { color: categoryAccents[pick.category] ?? palette.jadeBright },
                  ]}
                >
                  {pick.category.toUpperCase()}
                </Text>
              </View>
              <Text style={[inscription(20, 'bold'), styles.resultTitle]}>
                {pick.name.toUpperCase()}
              </Text>
              <Text style={[bodyText(12, 'regular'), styles.resultRegion]}>
                ⌖ {pick.city}, {pick.country}
              </Text>
            </View>
          </Animated.View>
        )}

        <View style={styles.actions}>
          {phase === 'revealed' && pick ? (
            <>
              <GlowButton
                label="Open in Temple Routes"
                onPress={() => openSite(pick.id, 'scroll')}
                style={styles.cta}
                icon={<ChevronRight size={16} color="#06141A" />}
              />
              <Pressable onPress={handleAgain} hitSlop={8} style={styles.again}>
                <Text style={[inscription(11, 'medium'), { color: palette.parchmentSoft }]}>
                  REVEAL ANOTHER
                </Text>
              </Pressable>
            </>
          ) : (
            <GlowButton
              label={phase === 'consulting' ? 'Consulting the scroll...' : 'Reveal a Place'}
              onPress={startReveal}
              variant={phase === 'consulting' ? 'ghost' : 'ember'}
              disabled={phase === 'consulting'}
              style={styles.cta}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  host: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: spacing.lg },
  vaseHost: {
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  vase: { width: 200, height: 200 },
  ringSpin: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 1,
    borderColor: 'transparent',
    borderTopColor: palette.jadeBright,
    borderRightColor: palette.emberGold,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.emberGold,
    shadowColor: palette.emberGold,
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  caption: { paddingHorizontal: spacing.xl, marginTop: spacing.md },
  captionText: { color: palette.fogSoft, textAlign: 'center', lineHeight: 19 },
  resultCard: {
    width: '100%',
    height: 200,
    borderRadius: radii.card,
    overflow: 'hidden',
    marginTop: - spacing.sm,
    borderWidth: 1,
    borderColor: palette.hairlineSoft,
    ...shadows.cinematic,
  },
  resultImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  resultGradient: { ...StyleSheet.absoluteFillObject },
  resultBody: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    gap: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.tiny,
    borderWidth: 1,
    backgroundColor: 'rgba(4,8,20,0.7)',
  },
  resultTitle: { color: palette.parchment },
  resultRegion: { color: palette.fogSoft },
  actions: { width: '100%', marginTop: spacing.lg, alignItems: 'center', gap: spacing.sm },
  cta: { alignSelf: 'stretch' },
  again: { paddingVertical: 10 },
});
