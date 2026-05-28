import React from 'react';
import { Animated, Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Bookmark, BookmarkCheck, ChevronRight } from 'lucide-react-native';
import { categoryAccents, categoryGradients, palette, radii, shadows, spacing } from '../themeStone/palette';
import { bodyText, inscription } from '../themeStone/fontPreset';
import { usePressLift } from '../motionTemple/usePressLift';
import { useStaggerEntrance } from '../motionTemple/useStaggerEntrance';
import { GlowButton } from './GlowButton';

type Props = {
  index: number;
  image: ImageSourcePropType;
  category: string;
  title: string;
  region: string;
  preview: string;
  saved: boolean;
  onSave: () => void;
  onOpen: () => void;
};

export const SiteCard: React.FC<Props> = ({
  index,
  image,
  category,
  title,
  region,
  preview,
  saved,
  onSave,
  onOpen,
}) => {
  const { opacity, translate } = useStaggerEntrance(index, 75);
  const { scale, onPressIn, onPressOut } = usePressLift(0.985);

  const grad = categoryGradients[category] ?? [palette.voidMid, palette.voidDeep];
  const accent = categoryAccents[category] ?? palette.jadeBright;

  return (
    <Animated.View
      style={[styles.host, { opacity, transform: [{ translateY: translate }, { scale }] }]}
    >
      <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onOpen}>
        <View style={styles.imageWrap}>
          <Image source={image} style={styles.image} />
          <LinearGradient
            colors={['rgba(4,8,20,0)', 'rgba(4,8,20,0.85)']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 0, y: 1 }}
          />
          <View style={[styles.badge, { borderColor: accent }]}>
            <Text style={[inscription(10, 'bold'), { color: accent }]}>
              {category.toUpperCase()}
            </Text>
          </View>
          <Pressable
            onPress={e => {
              e.stopPropagation?.();
              onSave();
            }}
            style={styles.bookmark}
            hitSlop={10}
          >
            {saved ? (
              <BookmarkCheck size={18} color={palette.jadeBright} fill={palette.jadeBright} />
            ) : (
              <Bookmark size={18} color={palette.parchmentSoft} />
            )}
          </Pressable>
        </View>
      </Pressable>

      <LinearGradient colors={grad} style={styles.body} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={styles.body__inset}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={[inscription(18, 'bold'), styles.title]}>{title.toUpperCase()}</Text>
              <Text style={[bodyText(12, 'regular'), styles.region]}>⌖  {region}</Text>
            </View>
            <ChevronRight size={20} color={palette.fogBlue} />
          </View>
          <Text style={[bodyText(13, 'regular'), styles.preview]} numberOfLines={3}>
            {preview}
          </Text>
          <View style={styles.actions}>
            <Pressable onPress={onSave} style={styles.saveBtn} hitSlop={8}>
              {saved ? (
                <BookmarkCheck size={14} color={palette.jadeBright} fill={palette.jadeBright} />
              ) : (
                <Bookmark size={14} color={palette.parchmentSoft} />
              )}
              <Text style={[inscription(11, 'medium'), styles.saveText]}>
                {saved ? 'SAVED' : 'SAVE'}
              </Text>
            </Pressable>
            <GlowButton label="Explore Route" onPress={onOpen} compact style={styles.exploreBtn} />
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  host: {
    borderRadius: radii.card,
    overflow: 'hidden',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.cinematic,
  },
  imageWrap: {
    height: 200,
    width: '100%',
    backgroundColor: palette.voidMid,
    position: 'relative',
  },
  image: { width: '100%', height: '100%' },
  badge: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.tiny,
    borderWidth: 1,
    backgroundColor: 'rgba(4,8,20,0.6)',
  },
  bookmark: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(4,8,20,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.hairlineSoft,
  },
  body: {
    borderTopWidth: 1,
    borderTopColor: palette.hairlineSoft,
  },
  body__inset: {
    padding: spacing.md,
    gap: 10,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  title: { color: palette.parchment },
  region: { color: palette.fogSoft, marginTop: 4 },
  preview: { color: palette.fogSoft, lineHeight: 19 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 4 },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    height: 40,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: palette.hairline,
    backgroundColor: 'rgba(4,8,20,0.45)',
  },
  saveText: { color: palette.parchmentSoft, letterSpacing: 1.5 },
  exploreBtn: { flex: 1 },
});
