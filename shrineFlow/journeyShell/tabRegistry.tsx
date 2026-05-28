import React from 'react';
import { BookOpen, Bookmark, Compass, MapPinned, Scroll, Sparkles } from 'lucide-react-native';
import type { JourneyTab } from './journeyContext';

type TabSpec = {
  key: JourneyTab;
  label: string;
  icon: (props: { color: string; size: number }) => React.ReactNode;
};

export const tabSpecs: TabSpec[] = [
  {
    key: 'routes',
    label: 'Routes',
    icon: ({ color, size }) => <BookOpen color={color} size={size} strokeWidth={1.6} />,
  },
  {
    key: 'map',
    label: 'Map',
    icon: ({ color, size }) => <MapPinned color={color} size={size} strokeWidth={1.6} />,
  },
  {
    key: 'scroll',
    label: 'Scroll',
    icon: ({ color, size }) => <Sparkles color={color} size={size} strokeWidth={1.6} />,
  },
  {
    key: 'notes',
    label: 'Notes',
    icon: ({ color, size }) => <Scroll color={color} size={size} strokeWidth={1.6} />,
  },
  {
    key: 'saved',
    label: 'Saved',
    icon: ({ color, size }) => <Bookmark color={color} size={size} strokeWidth={1.6} />,
  },
  {
    key: 'guidance',
    label: 'Guide',
    icon: ({ color, size }) => <Compass color={color} size={size} strokeWidth={1.6} />,
  },
];
