import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CategoryChip } from './CategoryChip';

type Props = {
  options: string[];
  active: string;
  onChange: (label: string) => void;
};

export const ChipRail: React.FC<Props> = ({ options, active, onChange }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.host}
    >
      {options.map(opt => (
        <CategoryChip key={opt} label={opt} active={active === opt} onPress={() => onChange(opt)} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  host: { flexGrow: 0 },
  content: { paddingHorizontal: 20, gap: 10, paddingBottom: 14 },
});
