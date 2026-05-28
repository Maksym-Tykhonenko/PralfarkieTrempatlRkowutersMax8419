import React from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Bookmark, BookmarkCheck, Clock } from 'lucide-react-native';
import { palette, radii, shadows, spacing } from '../themeStone/palette';
import { bodyText, inscription } from '../themeStone/fontPreset';
import { useStaggerEntrance } from '../motionTemple/useStaggerEntrance';
import { usePressLift } from '../motionTemple/usePressLift';
import { TempleNote } from './noteRegistry';

type Props = {
  index: number;
  note: TempleNote;
  saved: boolean;
  onSave: () => void;
  onOpen: () => void;
};

export const NoteCard: React.FC<Props> = ({ index, note, saved, onSave, onOpen }) => {
  const { opacity, translate } = useStaggerEntrance(index, 80);
  const { scale, onPressIn, onPressOut } = usePressLift(0.985);

  return (
    <Animated.View
      style={[styles.host, { opacity, transform: [{ translateY: translate }, { scale }] }]}
    >
      <Pressable onPress={onOpen} onPressIn={onPressIn} onPressOut={onPressOut}>
        <View style={styles.imgWrap}>
          <Image source={note.image} style={styles.img} />
          <LinearGradient
            colors={['rgba(4,8,20,0.05)', 'rgba(4,8,20,0.95)']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 0, y: 1 }}
          />
          <Pressable
            onPress={e => {
              e.stopPropagation?.();
              onSave();
            }}
            style={styles.bookmark}
            hitSlop={10}
          >
            {saved ? (
              <BookmarkCheck size={16} color={palette.jadeBright} fill={palette.jadeBright} />
            ) : (
              <Bookmark size={16} color={palette.parchmentSoft} />
            )}
          </Pressable>
          <View style={styles.metaPill}>
            <Clock size={11} color={palette.parchmentSoft} />
            <Text style={[bodyText(11, 'medium'), styles.metaText]}>
              {note.readMinutes} min read
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={[inscription(16, 'bold'), styles.title]}>{note.title.toUpperCase()}</Text>
          <Text style={[bodyText(13, 'regular'), styles.preview]} numberOfLines={3}>
            {note.preview}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  host: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: radii.card,
    overflow: 'hidden',
    backgroundColor: palette.voidMid,
    borderWidth: 1,
    borderColor: palette.hairlineSoft,
    ...shadows.cinematic,
  },
  imgWrap: { height: 180, backgroundColor: palette.voidMid },
  img: { width: '100%', height: '100%' },
  bookmark: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(4,8,20,0.55)',
    borderWidth: 1,
    borderColor: palette.hairlineSoft,
  },
  metaPill: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.tiny,
    backgroundColor: 'rgba(4,8,20,0.65)',
    borderWidth: 1,
    borderColor: palette.hairlineSoft,
  },
  metaText: { color: palette.parchmentSoft },
  body: { padding: spacing.md, gap: 8 },
  title: { color: palette.parchment },
  preview: { color: palette.fogSoft, lineHeight: 19 },
});
