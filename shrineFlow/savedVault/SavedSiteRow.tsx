import React from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { BookmarkCheck } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { categoryAccents, palette, radii, shadows, spacing } from '../themeStone/palette';
import { bodyText, inscription } from '../themeStone/fontPreset';
import { useStaggerEntrance } from '../motionTemple/useStaggerEntrance';
import { usePressLift } from '../motionTemple/usePressLift';
import type { SiteRecord } from '../routeArchive/categoryRegistry';

type Props = {
  index: number;
  site: SiteRecord;
  onOpen: () => void;
  onRemove: () => void;
};

export const SavedSiteRow: React.FC<Props> = ({ index, site, onOpen, onRemove }) => {
  const { opacity, translate } = useStaggerEntrance(index, 70);
  const { scale, onPressIn, onPressOut } = usePressLift(0.98);
  const accent = categoryAccents[site.category] ?? palette.jadeBright;

  return (
    <Animated.View style={[styles.host, { opacity, transform: [{ translateY: translate }, { scale }] }]}>
      <Pressable onPress={onOpen} onPressIn={onPressIn} onPressOut={onPressOut}>
        <LinearGradient
          colors={['rgba(20,32,58,0.7)', 'rgba(8,12,28,0.7)']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.row}>
          <Image source={site.image} style={styles.image} />
          <View style={styles.col}>
            <Text style={[inscription(9, 'medium'), { color: accent, letterSpacing: 1.5 }]}>
              {site.category.toUpperCase()}
            </Text>
            <Text style={[inscription(14, 'bold'), styles.title]} numberOfLines={1}>
              {site.name.toUpperCase()}
            </Text>
            <Text style={[bodyText(11, 'regular'), styles.region]} numberOfLines={1}>
              ⌖ {site.city}, {site.country}
            </Text>
          </View>
          <Pressable onPress={onRemove} hitSlop={10} style={styles.markBtn}>
            <BookmarkCheck size={18} color={palette.jadeBright} fill={palette.jadeBright} />
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  host: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    borderRadius: radii.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.hairlineSoft,
    ...shadows.cinematic,
  },
  row: { flexDirection: 'row', alignItems: 'center', padding: spacing.sm, gap: spacing.sm },
  image: {
    width: 64,
    height: 64,
    borderRadius: radii.tiny,
    backgroundColor: palette.voidMid,
  },
  col: { flex: 1, gap: 4 },
  title: { color: palette.parchment },
  region: { color: palette.fogSoft },
  markBtn: { padding: 6 },
});
