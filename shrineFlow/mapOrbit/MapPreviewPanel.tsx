import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { X, ChevronRight } from 'lucide-react-native';
import { categoryAccents, palette, radii, shadows, spacing } from '../themeStone/palette';
import { bodyText, inscription } from '../themeStone/fontPreset';
import { GlowButton } from '../commonRelics/GlowButton';
import type { SiteRecord } from '../routeArchive/categoryRegistry';
import { RoundIconButton } from '../commonRelics/RoundIconButton';

type Props = {
  site: SiteRecord;
  onClose: () => void;
  onOpen: () => void;
};

export const MapPreviewPanel: React.FC<Props> = ({ site, onClose, onOpen }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 360,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [site.id, anim]);

  const translate = anim.interpolate({ inputRange: [0, 1], outputRange: [60, 0] });
  const accent = categoryAccents[site.category] ?? palette.jadeBright;

  return (
    <Animated.View
      style={[
        styles.host,
        { opacity: anim, transform: [{ translateY: translate }] },
      ]}
    >
      <LinearGradient
        colors={['#101A32', '#0A1224']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.row}>
        <Image source={site.image} style={styles.image} />
        <View style={styles.col}>
          <View style={styles.head}>
            <View style={[styles.badge, { borderColor: accent }]}>
              <Text style={[inscription(9, 'bold'), { color: accent }]}>
                {site.category.toUpperCase()}
              </Text>
            </View>
            <RoundIconButton onPress={onClose} size={28}>
              <X size={14} color={palette.parchmentSoft} />
            </RoundIconButton>
          </View>
          <Text style={[inscription(15, 'bold'), styles.title]} numberOfLines={1}>
            {site.name.toUpperCase()}
          </Text>
          <Text style={[bodyText(11, 'regular'), styles.region]} numberOfLines={1}>
            ⌖ {site.city}, {site.country}
          </Text>
          <Pressable onPress={onOpen} style={styles.openLink}>
            <Text style={[inscription(11, 'bold'), { color: palette.jadeBright }]}>
              OPEN IN TEMPLE ROUTES
            </Text>
            <ChevronRight size={14} color={palette.jadeBright} />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  host: {
    margin: spacing.md,
    borderRadius: radii.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.hairlineSoft,
    ...shadows.cinematic,
  },
  row: { flexDirection: 'row', padding: spacing.sm },
  image: {
    width: 96,
    height: 96,
    borderRadius: radii.tiny,
    marginRight: spacing.sm,
    backgroundColor: palette.voidMid,
  },
  col: { flex: 1, justifyContent: 'space-between' },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.tiny,
    borderWidth: 1,
    backgroundColor: 'rgba(4,8,20,0.55)',
  },
  title: { color: palette.parchment, marginTop: 6 },
  region: { color: palette.fogSoft, marginTop: 2 },
  openLink: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
});
