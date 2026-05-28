import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Clock } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientBackdrop } from '../commonRelics/GradientBackdrop';
import { DetailHero } from '../commonRelics/DetailHero';
import { palette, spacing } from '../themeStone/palette';
import { bodyText, inscription } from '../themeStone/fontPreset';
import { findNote } from './noteRegistry';
import { useSavedNotes } from '../storageRunes/useSavedRegistry';

type Props = { id: string; onClose: () => void };

export const NoteArticleView: React.FC<Props> = ({ id, onClose }) => {
  const insets = useSafeAreaInsets();
  const note = findNote(id);
  const { isSaved, toggle } = useSavedNotes();
  if (!note) return null;

  return (
    <GradientBackdrop>
      <DetailHero
        image={note.image}
        category={note.category}
        title={note.title}
        body={note.body}
        saved={isSaved(note.id)}
        onBack={onClose}
        onSave={() => toggle(note.id)}
        shareMessage={`${note.title} — ${note.preview}`}
        topInset={insets.top}
        meta={
          <View style={styles.metaRow}>
            <Clock size={13} color={palette.fogSoft} />
            <Text style={[bodyText(12, 'regular'), styles.metaText]}>
              {note.readMinutes} min read · Temple Notes
            </Text>
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
  },
  metaText: { color: palette.fogSoft, letterSpacing: 0.6 },
});
