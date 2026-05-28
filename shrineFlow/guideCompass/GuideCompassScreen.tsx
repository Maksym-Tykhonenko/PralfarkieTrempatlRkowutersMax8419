import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { spacing } from '../themeStone/palette';
import { HeaderInscription } from '../commonRelics/HeaderInscription';
import { ChipRail } from '../commonRelics/ChipRail';
import { GUIDE_CATEGORIES, guideByCategory } from './guidanceRegistry';
import { GuideTipCard } from './GuideTipCard';
import { useTabBarMetrics } from '../journeyShell/tabBarMetrics';

export const GuideCompassScreen: React.FC = () => {
  const [active, setActive] = useState<string>('All');
  const list = useMemo(() => guideByCategory(active), [active]);
  const tabBar = useTabBarMetrics();

  return (
    <View style={styles.host}>
      <HeaderInscription
        label="Traveler Guidance"
        title="Guide Compass"
        subtitle="Practical guidance for sacred travel days"
      />
      <ChipRail
        options={GUIDE_CATEGORIES as unknown as string[]}
        active={active}
        onChange={setActive}
      />
      <FlatList
        data={list}
        keyExtractor={t => t.id}
        renderItem={({ item, index }) => <GuideTipCard index={index} tip={item} />}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: tabBar.total + spacing.lg },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  host: { flex: 1 },
  list: { paddingTop: spacing.sm },
});
