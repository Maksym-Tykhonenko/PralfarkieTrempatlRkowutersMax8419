import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MapPin, Navigation } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientBackdrop } from '../commonRelics/GradientBackdrop';
import { DetailHero } from '../commonRelics/DetailHero';
import { GlowButton } from '../commonRelics/GlowButton';
import { palette, radii, spacing } from '../themeStone/palette';
import { bodyText, inscription } from '../themeStone/fontPreset';
import { findSite } from './categoryRegistry';
import { useSavedPlaces } from '../storageRunes/useSavedRegistry';
import { useJourney } from '../journeyShell/journeyContext';

type Props = { id: string; onClose: () => void };

export const SiteDetailView: React.FC<Props> = ({ id, onClose }) => {
  const insets = useSafeAreaInsets();
  const site = findSite(id);
  const { isSaved, toggle } = useSavedPlaces();
  const { setActiveTab, requestMapFocus } = useJourney();

  if (!site) return null;

  const handleMap = () => {
    requestMapFocus(site.id);
    setActiveTab('map');
    onClose();
  };

  return (
    <GradientBackdrop>
      <DetailHero
        image={site.image}
        category={site.category}
        title={site.name}
        subtitle={`${site.city}, ${site.country}`}
        body={site.long}
        saved={isSaved(site.id)}
        onBack={onClose}
        onSave={() => toggle(site.id)}
        shareMessage={`${site.name} — ${site.short}\n${site.address}`}
        topInset={insets.top}
        meta={
          <View style={styles.metaRow}>
            <Navigation size={14} color={palette.fogSoft} />
            <Text style={[bodyText(12, 'regular'), styles.metaText]}>
              {site.coordinates[0].toFixed(4)}° N, {site.coordinates[1].toFixed(4)}° E
            </Text>
          </View>
        }
        footer={
          <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
            <View style={styles.addressRow}>
              <MapPin size={14} color={palette.emberGold} />
              <Text style={[bodyText(12, 'regular'), styles.addressText]} numberOfLines={2}>
                {site.address}
              </Text>
            </View>
            <GlowButton
              label="View on Map"
              onPress={handleMap}
              variant="jade"
              icon={<MapPin size={16} color="#06141A" />}
            />
          </View>
        }
      />
    </GradientBackdrop>
  );
};

const styles = StyleSheet.create({
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: spacing.lg,
    paddingHorizontal: 0,
  },
  metaText: { color: palette.fogSoft, letterSpacing: 0.6 },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: spacing.sm,
    backgroundColor: palette.glass,
    borderRadius: radii.tiny,
    borderWidth: 1,
    borderColor: palette.hairlineSoft,
  },
  addressText: { color: palette.parchmentSoft, flex: 1 },
});
