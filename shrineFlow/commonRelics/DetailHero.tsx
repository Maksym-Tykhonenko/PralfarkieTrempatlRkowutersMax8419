import React, { useRef } from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, Bookmark, BookmarkCheck, Share2 } from 'lucide-react-native';
import { palette, radii, spacing } from '../themeStone/palette';
import { bodyText, inscription } from '../themeStone/fontPreset';
import { useEntranceFade } from '../motionTemple/useEntranceFade';
import { RoundIconButton } from './RoundIconButton';

type Props = {
  image: ImageSourcePropType;
  category?: string;
  title: string;
  subtitle?: string;
  body: string;
  saved: boolean;
  onBack: () => void;
  onSave: () => void;
  shareMessage: string;
  footer?: React.ReactNode;
  meta?: React.ReactNode;
  topInset: number;
};

export const DetailHero: React.FC<Props> = ({
  image,
  category,
  title,
  subtitle,
  body,
  saved,
  onBack,
  onSave,
  shareMessage,
  footer,
  meta,
  topInset,
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const heroOpacity = useEntranceFade(40, 600, 12);

  const heroScale = scrollY.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [1.18, 1, 1],
    extrapolate: 'clamp',
  });

  const handleShare = () => {
    Share.share({ message: shareMessage }).catch(() => {});
  };

  return (
    <Animated.View
      style={[
        styles.host,
        { opacity: heroOpacity.opacity, transform: [{ translateY: heroOpacity.translate }] },
      ]}
    >
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      >
        <Animated.View style={[styles.heroWrap, { transform: [{ scale: heroScale }] }]}>
          <Image source={image} style={styles.heroImage} />
          <LinearGradient
            colors={['rgba(4,8,20,0)', 'rgba(4,8,20,0.85)']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0.3 }}
            end={{ x: 0, y: 1 }}
          />
          {category && (
            <View style={styles.badge}>
              <Text style={[inscription(10, 'bold'), { color: palette.parchment }]}>
                {category.toUpperCase()}
              </Text>
            </View>
          )}
        </Animated.View>

        <View style={styles.body}>
          <Text style={[inscription(26, 'bold'), styles.title]}>{title.toUpperCase()}</Text>
          {subtitle ? (
            <Text style={[bodyText(13, 'regular'), styles.subtitle]}>⌖  {subtitle}</Text>
          ) : null}
          <View style={styles.divider} />
          <Text style={[bodyText(14, 'regular'), styles.bodyText]}>{body}</Text>
          {meta}
        </View>
        {footer}
        <View style={{ height: spacing.xxl }} />
      </Animated.ScrollView>

      <View style={[styles.topBar, { top: topInset + 6 }]} pointerEvents="box-none">
        <RoundIconButton onPress={onBack}>
          <ArrowLeft size={18} color={palette.parchment} />
        </RoundIconButton>
        <View style={{ flex: 1 }} />
        <RoundIconButton onPress={onSave} variant={saved ? 'jade' : 'glass'}>
          {saved ? (
            <BookmarkCheck size={17} color={palette.jadeBright} fill={palette.jadeBright} />
          ) : (
            <Bookmark size={17} color={palette.parchment} />
          )}
        </RoundIconButton>
        <View style={{ width: 10 }} />
        <RoundIconButton onPress={handleShare}>
          <Share2 size={17} color={palette.parchment} />
        </RoundIconButton>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  host: { flex: 1 },
  scrollContent: { paddingBottom: spacing.xl },
  heroWrap: { height: 380, backgroundColor: palette.voidMid, overflow: 'hidden' },
  heroImage: { width: '100%', height: '100%' },
  badge: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.tiny,
    backgroundColor: 'rgba(4,8,20,0.6)',
    borderWidth: 1,
    borderColor: palette.emberGold,
  },
  body: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  title: { color: palette.parchment },
  subtitle: { color: palette.fogSoft, marginTop: 8 },
  divider: { width: 32, height: 1, backgroundColor: palette.emberGold, marginTop: spacing.md },
  bodyText: { color: palette.parchmentSoft, lineHeight: 22, marginTop: spacing.md },
  topBar: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
