import React from 'react';
import { Animated, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { palette, spacing } from '../themeStone/palette';
import { bodyText, inscription } from '../themeStone/fontPreset';
import { useEntranceFade } from '../motionTemple/useEntranceFade';
import { useSoftPulse } from '../motionTemple/useSoftPulse';
import { GlowButton } from './GlowButton';

type Props = {
  title: string;
  description: string;
  ctaLabel?: string;
  onCta?: () => void;
  illustration?: ImageSourcePropType;
};

export const EmptyAltar: React.FC<Props> = ({ title, description, ctaLabel, onCta, illustration }) => {
  const { opacity, translate } = useEntranceFade(120, 700, 18);
  const { scale } = useSoftPulse(true, 4000, 0.08);
  return (
    <Animated.View
      style={[styles.host, { opacity, transform: [{ translateY: translate }] }]}
    >
      {illustration && (
        <Animated.View style={{ transform: [{ scale }] }}>
          <Image source={illustration} style={styles.illu} resizeMode="contain" />
        </Animated.View>
      )}
      <View style={styles.divider} />
      <Text style={[inscription(18, 'bold'), styles.title]}>{title.toUpperCase()}</Text>
      <Text style={[bodyText(13, 'regular'), styles.text]}>{description}</Text>
      {ctaLabel && onCta && (
        <GlowButton label={ctaLabel} onPress={onCta} style={styles.cta} />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  host: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    gap: spacing.sm,
  },
  illu: { width: 140, height: 140, marginBottom: spacing.md },
  divider: { width: 24, height: 1, backgroundColor: palette.emberGold, marginBottom: spacing.sm },
  title: { color: palette.parchment, textAlign: 'center' },
  text: { color: palette.fogSoft, textAlign: 'center', lineHeight: 19, marginBottom: spacing.md },
  cta: { minWidth: 220 },
});
