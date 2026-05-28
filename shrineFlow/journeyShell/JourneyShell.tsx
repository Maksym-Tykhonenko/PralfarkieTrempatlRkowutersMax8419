import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { palette } from '../themeStone/palette';
import { JourneyProvider, useJourney } from './journeyContext';
import { BottomConstellation } from './BottomConstellation';
import { useTabBarMetrics } from './tabBarMetrics';
import { GradientBackdrop } from '../commonRelics/GradientBackdrop';
import { RouteArchiveScreen } from '../routeArchive/RouteArchiveScreen';
import { MapOrbitScreen } from '../mapOrbit/MapOrbitScreen';
import { ScrollRevealScreen } from '../scrollReveal/ScrollRevealScreen';
import { NoteLibraryScreen } from '../noteLibrary/NoteLibraryScreen';
import { SavedVaultScreen } from '../savedVault/SavedVaultScreen';
import { GuideCompassScreen } from '../guideCompass/GuideCompassScreen';
import { SiteDetailView } from '../routeArchive/SiteDetailView';
import { NoteArticleView } from '../noteLibrary/NoteArticleView';

const TabSurface: React.FC = () => {
  const { activeTab } = useJourney();
  const tabKey = activeTab;
  const fade = useRef(new Animated.Value(0)).current;
  const lastTab = useRef(tabKey);

  useEffect(() => {
    if (lastTab.current === tabKey) {
      fade.setValue(1);
      return;
    }
    lastTab.current = tabKey;
    fade.setValue(0);
    Animated.timing(fade, {
      toValue: 1,
      duration: 360,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [tabKey, fade]);

  const translate = fade.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, { opacity: fade, transform: [{ translateY: translate }] }]}
    >
      {tabKey === 'routes' && <RouteArchiveScreen />}
      {tabKey === 'map' && <MapOrbitScreen />}
      {tabKey === 'scroll' && <ScrollRevealScreen />}
      {tabKey === 'notes' && <NoteLibraryScreen />}
      {tabKey === 'saved' && <SavedVaultScreen />}
      {tabKey === 'guidance' && <GuideCompassScreen />}
    </Animated.View>
  );
};

const DetailLayer: React.FC = () => {
  const { detail, closeDetail } = useJourney();
  const anim = useRef(new Animated.Value(0)).current;
  const wasOpen = useRef(false);

  useEffect(() => {
    const open = detail.kind !== 'none';
    if (open && !wasOpen.current) {
      wasOpen.current = true;
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else if (!open && wasOpen.current) {
      wasOpen.current = false;
    }
  }, [detail, anim]);

  if (detail.kind === 'none') return null;

  const translate = anim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] });

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, { opacity: anim, transform: [{ translateY: translate }] }]}
    >
      {detail.kind === 'site' && <SiteDetailView id={detail.id} onClose={closeDetail} />}
      {detail.kind === 'note' && <NoteArticleView id={detail.id} onClose={closeDetail} />}
    </Animated.View>
  );
};

const Inner: React.FC = () => {
  const { activeTab, setActiveTab, detail } = useJourney();
  const tabBar = useTabBarMetrics();

  return (
    <GradientBackdrop>
      <View
        style={[
          styles.surface,
          { paddingBottom: detail.kind === 'none' ? tabBar.total : 0 },
        ]}
      >
        <TabSurface />
      </View>
      <DetailLayer />
      {detail.kind === 'none' && (
        <BottomConstellation active={activeTab} onChange={setActiveTab} />
      )}
    </GradientBackdrop>
  );
};

export const JourneyShell: React.FC = () => (
  <JourneyProvider>
    <Inner />
  </JourneyProvider>
);

const styles = StyleSheet.create({
  surface: { flex: 1, backgroundColor: 'transparent' },
});
