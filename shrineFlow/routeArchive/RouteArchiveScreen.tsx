import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { palette, spacing } from '../themeStone/palette';
import { HeaderInscription } from '../commonRelics/HeaderInscription';
import { ChipRail } from '../commonRelics/ChipRail';
import { SiteCard } from '../commonRelics/SiteCard';
import { ROUTE_CATEGORIES, sitesByCategory } from './categoryRegistry';
import { useSavedPlaces } from '../storageRunes/useSavedRegistry';
import { useJourney } from '../journeyShell/journeyContext';
import { useTabBarMetrics } from '../journeyShell/tabBarMetrics';

export const RouteArchiveScreen: React.FC = () => {
  const [active, setActive] = useState<string>('All');
  const { isSaved, toggle } = useSavedPlaces();
  const { openSite } = useJourney();
  const tabBar = useTabBarMetrics();

  const list = useMemo(() => sitesByCategory(active), [active]);

  return (
    <View style={styles.host}>
      <HeaderInscription
        label="Temple Routes"
        title="Temple Routes"
        subtitle="Ancient paths through curated lands"
      />
      <ChipRail
        options={ROUTE_CATEGORIES as unknown as string[]}
        active={active}
        onChange={setActive}
      />
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <SiteCard
            index={index}
            image={item.image}
            category={item.category}
            title={item.name}
            region={`${item.city}, ${item.country}`}
            preview={item.short}
            saved={isSaved(item.id)}
            onSave={() => toggle(item.id)}
            onOpen={() => openSite(item.id, 'routes')}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: tabBar.total + spacing.lg },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  host: { flex: 1, backgroundColor: 'transparent' },
  listContent: { paddingTop: spacing.sm },
});
