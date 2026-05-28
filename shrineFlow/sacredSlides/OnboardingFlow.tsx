import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette, spacing } from '../themeStone/palette';
import { bodyText, inscription } from '../themeStone/fontPreset';
import { GlowButton } from '../commonRelics/GlowButton';
import { sacredSlideList } from './slideRegistry';
import { vaultOnboarding } from '../storageRunes/sacredVault';

type Props = { onFinish: () => void };

const { width: SCREEN_W } = Dimensions.get('window');

export const OnboardingFlow: React.FC<Props> = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const lastStep = sacredSlideList.length - 1;

  const goTo = (next: number) => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 260,
      useNativeDriver: true,
    }).start(() => {
      setStep(next);
      slideAnim.setValue(-1);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 380,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleNext = () => {
    if (step >= lastStep) {
      vaultOnboarding.markDone();
      onFinish();
      return;
    }
    goTo(step + 1);
  };

  const handleSkip = () => {
    vaultOnboarding.markDone();
    onFinish();
  };

  const slide = sacredSlideList[step];
  const isLast = step === lastStep;

  const translateX = slideAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [SCREEN_W * 0.5, 0, -SCREEN_W * 0.5],
  });
  const opacity = slideAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 1, 0],
  });

  return (
    <View style={styles.host}>
      <Image source={slide.background} style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
      }} resizeMode="cover" />
      <LinearGradient
        colors={['rgba(4,8,20,0.15)', 'rgba(4,8,20,0.55)', 'rgba(4,8,20,0.96)']}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.dotsRow, { top: insets.top + 18 }]}>
        {sacredSlideList.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === step && styles.dotActive,
              i < step && styles.dotPast,
            ]}
          />
        ))}
      </View>

      <View style={[styles.contentArea, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Animated.View
          style={[styles.text, { opacity, transform: [{ translateX }] }]}
        >
          <View style={styles.divider} />
          <Text style={[inscription(28, 'bold'), styles.title]}>{slide.title.toUpperCase()}</Text>
          <Text style={[bodyText(14, 'regular'), styles.subtitle]}>{slide.text}</Text>
        </Animated.View>

        <View style={styles.actions}>
          <GlowButton
            label={isLast ? 'Start Exploring' : 'Continue'}
            onPress={handleNext}
            variant="jade"
            style={styles.cta}
          />
          {!isLast && (
            <Pressable onPress={handleSkip} hitSlop={10} style={styles.skip}>
              <Text style={[bodyText(13, 'medium'), { color: palette.parchmentSoft }]}>Skip</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  host: { flex: 1, backgroundColor: palette.voidDeep },
  dotsRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(226,210,178,0.25)',
  },
  dotActive: {
    width: 22,
    backgroundColor: palette.jadeBright,
  },
  dotPast: {
    backgroundColor: palette.emberGold,
  },
  contentArea: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.xl,
  },
  text: { alignItems: 'center', marginBottom: spacing.xl },
  divider: { width: 28, height: 1, backgroundColor: palette.emberGold, marginBottom: spacing.md },
  title: { color: palette.parchment, textAlign: 'center', lineHeight: 36 },
  subtitle: {
    color: palette.fogSoft,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: 21,
    paddingHorizontal: spacing.md,
  },
  actions: { alignItems: 'center', gap: spacing.md, paddingBottom: spacing.md },
  cta: { alignSelf: 'stretch' },
  skip: { paddingVertical: 10 },
});
