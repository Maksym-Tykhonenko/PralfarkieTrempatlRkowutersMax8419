import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { spacing } from '../themeStone/palette';
import { HeaderInscription } from '../commonRelics/HeaderInscription';
import { NoteCard } from './NoteCard';
import { templeNoteList } from './noteRegistry';
import { useSavedNotes } from '../storageRunes/useSavedRegistry';
import { useJourney } from '../journeyShell/journeyContext';
import { useTabBarMetrics } from '../journeyShell/tabBarMetrics';

export const NoteLibraryScreen: React.FC = () => {
  const { isSaved, toggle } = useSavedNotes();
  const { openNote } = useJourney();
  const tabBar = useTabBarMetrics();

  return (
    <View style={styles.host}>
      <HeaderInscription
        label="Temple Notes"
        title="Temple Notes"
        subtitle="Editorial scrolls on ancient cultures"
      />
      <FlatList
        data={templeNoteList}
        keyExtractor={n => n.id}
        renderItem={({ item, index }) => (
          <NoteCard
            index={index}
            note={item}
            saved={isSaved(item.id)}
            onSave={() => toggle(item.id)}
            onOpen={() => openNote(item.id, 'notes')}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: tabBar.total + spacing.lg },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  host: { flex: 1 },
  content: { paddingTop: spacing.sm },
});
