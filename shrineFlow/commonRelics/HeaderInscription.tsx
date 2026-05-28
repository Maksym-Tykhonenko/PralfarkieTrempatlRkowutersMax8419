import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette, spacing } from '../themeStone/palette';
import { bodyText, inscription } from '../themeStone/fontPreset';
import { useEntranceFade } from '../motionTemple/useEntranceFade';

type Props = {
  label: string;
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
};

export const HeaderInscription: React.FC<Props> = ({ label, title, subtitle, trailing }) => {
  const { opacity, translate } = useEntranceFade(60, 600, 18);
  const insets = useSafeAreaInsets();
  return (
    <Animated.View
      style={[
        styles.host,
        { opacity, transform: [{ translateY: translate }], paddingTop: insets.top + spacing.sm },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={styles.labelRow}>
            <View style={styles.bar} />
            <Text style={[inscription(11, 'medium'), styles.label]}>{label.toUpperCase()}</Text>
          </View>
          <Text style={[inscription(26, 'bold'), styles.title]}>{title.toUpperCase()}</Text>
          {subtitle ? (
            <Text style={[bodyText(13, 'regular'), styles.subtitle]}>{subtitle}</Text>
          ) : null}
        </View>
        {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  host: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  left: { flex: 1 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bar: { width: 3, height: 14, backgroundColor: palette.emberGold, borderRadius: 2 },
  label: { color: palette.emberGold, letterSpacing: 2 },
  title: { color: palette.parchment, marginTop: 6 },
  subtitle: { color: palette.fogSoft, marginTop: 6 },
  trailing: { marginLeft: spacing.md, justifyContent: 'flex-end' },
});
