import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  LayoutChangeEvent,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ChevronDown, Share2 } from 'lucide-react-native';
import { palette, radii, shadows, spacing } from '../themeStone/palette';
import { bodyText, inscription } from '../themeStone/fontPreset';
import { useStaggerEntrance } from '../motionTemple/useStaggerEntrance';
import type { GuideTip } from './guidanceRegistry';

type Props = {
  index: number;
  tip: GuideTip;
};

export const GuideTipCard: React.FC<Props> = ({ index, tip }) => {
  const { opacity, translate } = useStaggerEntrance(index, 80);
  const [open, setOpen] = useState(false);
  const [bodyHeight, setBodyHeight] = useState(0);
  const reveal = useRef(new Animated.Value(0)).current;
  const arrow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(reveal, {
        toValue: open ? 1 : 0,
        duration: 320,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(arrow, {
        toValue: open ? 1 : 0,
        duration: 320,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [open, reveal, arrow]);

  const handleShare = () => {
    Share.share({ message: `${tip.name} — ${tip.subtitle}\n\n${tip.text}` }).catch(() => {});
  };

  const measure = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h && Math.abs(h - bodyHeight) > 1) setBodyHeight(h);
  };

  const animatedHeight = reveal.interpolate({ inputRange: [0, 1], outputRange: [0, bodyHeight] });
  const rotation = arrow.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });

  return (
    <Animated.View
      style={[styles.host, { opacity, transform: [{ translateY: translate }] }]}
    >
      <Pressable onPress={() => setOpen(o => !o)}>
        <View style={styles.imgWrap}>
          <Image source={tip.image} style={styles.img} />
          <LinearGradient
            colors={['rgba(4,8,20,0.05)', 'rgba(4,8,20,0.92)']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0.1 }}
            end={{ x: 0, y: 1 }}
          />
          <View style={styles.badge}>
            <Text style={[inscription(10, 'bold'), { color: palette.jadeBright }]}>
              {tip.category.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.head}>
          <View style={{ flex: 1 }}>
            <Text style={[inscription(16, 'bold'), styles.title]}>{tip.name.toUpperCase()}</Text>
            <Text style={[bodyText(13, 'regular'), styles.subtitle]}>{tip.subtitle}</Text>
          </View>
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <ChevronDown color={palette.parchmentSoft} size={18} />
          </Animated.View>
        </View>
      </Pressable>

      <Animated.View style={[styles.bodyClip, { height: animatedHeight, opacity: reveal }]}>
        <View style={styles.bodyMeasure} onLayout={measure}>
          <View style={styles.divider} />
          <Text style={[bodyText(14, 'regular'), styles.bodyText]}>{tip.text}</Text>
          <Pressable onPress={handleShare} style={styles.shareBtn} hitSlop={8}>
            <Share2 size={14} color={palette.jadeBright} />
            <Text style={[inscription(11, 'bold'), { color: palette.jadeBright }]}>SHARE TIP</Text>
          </Pressable>
        </View>
      </Animated.View>
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
  imgWrap: { height: 150 },
  img: { width: '100%', height: '100%' },
  badge: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.tiny,
    borderWidth: 1,
    borderColor: palette.jadeBright,
    backgroundColor: 'rgba(4,8,20,0.6)',
  },
  head: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, gap: spacing.sm },
  title: { color: palette.parchment },
  subtitle: { color: palette.fogSoft, marginTop: 4, lineHeight: 19 },
  bodyClip: { overflow: 'hidden' },
  bodyMeasure: { position: 'absolute', left: 0, right: 0, paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  divider: { width: 28, height: 1, backgroundColor: palette.emberGold, marginBottom: spacing.sm },
  bodyText: { color: palette.parchmentSoft, lineHeight: 22 },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginTop: spacing.md,
    paddingHorizontal: 14,
    height: 38,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: palette.jadeBright,
    backgroundColor: 'rgba(95,189,167,0.1)',
  },
});
