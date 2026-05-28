import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { spacing } from '../themeStone/palette';
import { HeaderInscription } from '../commonRelics/HeaderInscription';
import { SegmentSwitch } from '../commonRelics/SegmentSwitch';
import { EmptyAltar } from '../commonRelics/EmptyAltar';
import { SavedSiteRow } from './SavedSiteRow';
import { SavedNoteRow } from './SavedNoteRow';
import { useSavedNotes, useSavedPlaces } from '../storageRunes/useSavedRegistry';
import { findSite } from '../routeArchive/categoryRegistry';
import { findNote } from '../noteLibrary/noteRegistry';
import { useJourney } from '../journeyShell/journeyContext';
import { useTabBarMetrics } from '../journeyShell/tabBarMetrics';

const VASE = require('../../ritrupligsmtreu/wakza.png');

export const SavedVaultScreen: React.FC = () => {
  const [tab, setTab] = useState<'places' | 'notes'>('places');
  const { ids: placeIds, toggle: togglePlace } = useSavedPlaces();
  const { ids: noteIds, toggle: toggleNote } = useSavedNotes();
  const { openSite, openNote, setActiveTab } = useJourney();
  const tabBar = useTabBarMetrics();
  const listContent = { paddingTop: spacing.md, paddingBottom: tabBar.total + spacing.lg };

  const savedPlaces = useMemo(
    () => placeIds.map(findSite).filter((s): s is NonNullable<typeof s> => Boolean(s)),
    [placeIds],
  );
  const savedNotes = useMemo(
    () => noteIds.map(findNote).filter((n): n is NonNullable<typeof n> => Boolean(n)),
    [noteIds],
  );

  return (
    <View style={styles.host}>
      <HeaderInscription
        label="Saved Shrines"
        title="Saved Shrines"
        subtitle="Your personal sacred collection"
      />
      <SegmentSwitch
        active={tab}
        onChange={k => setTab(k as 'places' | 'notes')}
        options={[
          { key: 'places', label: `Locations (${savedPlaces.length})` },
          { key: 'notes', label: `Articles (${savedNotes.length})` },
        ]}
      />
      {tab === 'places' ? (
        savedPlaces.length === 0 ? (
          <EmptyAltar
            illustration={VASE}
            title="No saved shrines yet"
            description="Save temples, monasteries, ruins, routes, and notes to build your personal sacred travel collection."
            ctaLabel="Explore Temple Routes"
            onCta={() => setActiveTab('routes')}
          />
        ) : (
          <FlatList
            data={savedPlaces}
            keyExtractor={s => s.id}
            renderItem={({ item, index }) => (
              <SavedSiteRow
                index={index}
                site={item}
                onOpen={() => openSite(item.id, 'saved')}
                onRemove={() => togglePlace(item.id)}
              />
            )}
            contentContainerStyle={listContent}
            showsVerticalScrollIndicator={false}
          />
        )
      ) : savedNotes.length === 0 ? (
        <EmptyAltar
          illustration={VASE}
          title="No saved articles yet"
          description="Open Temple Notes to discover editorial pieces about ancient architecture, monasteries, symbolism, and respectful travel."
          ctaLabel="Open Temple Notes"
          onCta={() => setActiveTab('notes')}
        />
      ) : (
        <FlatList
          data={savedNotes}
          keyExtractor={n => n.id}
          renderItem={({ item, index }) => (
            <SavedNoteRow
              index={index}
              note={item}
              onOpen={() => openNote(item.id, 'saved')}
              onRemove={() => toggleNote(item.id)}
            />
          )}
          contentContainerStyle={listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  host: { flex: 1 },
});
