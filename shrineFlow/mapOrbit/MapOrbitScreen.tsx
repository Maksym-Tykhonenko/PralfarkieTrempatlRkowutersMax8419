import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { palette, spacing } from '../themeStone/palette';
import { HeaderInscription } from '../commonRelics/HeaderInscription';
import { ChipRail } from '../commonRelics/ChipRail';
import { ROUTE_CATEGORIES, sacredSiteList, sitesByCategory } from '../routeArchive/categoryRegistry';
import { buildMapHtml } from './mapTerrainHtml';
import { MapPreviewPanel } from './MapPreviewPanel';
import { useJourney } from '../journeyShell/journeyContext';
import { useTabBarMetrics } from '../journeyShell/tabBarMetrics';

export const MapOrbitScreen: React.FC = () => {
  const [active, setActive] = useState<string>('All');
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const webRef = useRef<WebView>(null);
  const pendingFocusRef = useRef<string | null>(null);
  const { openSite, mapFocus, clearMapFocus } = useJourney();
  const tabBar = useTabBarMetrics();

  const html = useMemo(() => buildMapHtml(sacredSiteList), []);
  const filtered = useMemo(() => sitesByCategory(active), [active]);
  const filteredIds = useMemo(() => new Set(filtered.map(f => f.id)), [filtered]);

  const focusPin = useCallback((id: string) => {
    const script = `if(window.__focusPin) window.__focusPin(${JSON.stringify(id)}); true;`;
    webRef.current?.injectJavaScript(script);
  }, []);

  const clearActive = useCallback(() => {
    const script = `if(window.__clearActive) window.__clearActive(); true;`;
    webRef.current?.injectJavaScript(script);
  }, []);

  // Honor focus requests from other screens (e.g. "View on Map" in detail)
  useEffect(() => {
    if (!mapFocus) return;
    const id = mapFocus.id;
    // Ensure the pin is visible under current filter
    const site = sacredSiteList.find(s => s.id === id);
    if (site && !filteredIds.has(id)) {
      setActive('All');
    }
    setPreviewId(id);
    if (mapReady) {
      focusPin(id);
      clearMapFocus();
    } else {
      pendingFocusRef.current = id;
    }
  }, [mapFocus, mapReady, filteredIds, focusPin, clearMapFocus]);

  // Flush pending focus once the map has loaded
  useEffect(() => {
    if (mapReady && pendingFocusRef.current) {
      focusPin(pendingFocusRef.current);
      pendingFocusRef.current = null;
      clearMapFocus();
    }
  }, [mapReady, focusPin, clearMapFocus]);

  const handleMessage = (e: WebViewMessageEvent) => {
    try {
      const msg = JSON.parse(e.nativeEvent.data);
      if (msg.type === 'ready') {
        setMapReady(true);
      } else if (msg.type === 'pin') {
        if (filteredIds.has(msg.id)) setPreviewId(msg.id);
      } else if (msg.type === 'blank') {
        setPreviewId(null);
      }
    } catch {}
  };

  const handleClosePreview = () => {
    setPreviewId(null);
    clearActive();
  };

  const handleFilterChange = (key: string) => {
    setActive(key);
    setPreviewId(null);
    clearActive();
  };

  const preview = previewId ? sacredSiteList.find(s => s.id === previewId) ?? null : null;
  const previewBottom = tabBar.total + spacing.sm;

  return (
    <View style={styles.host}>
      <HeaderInscription
        label="Sacred Map"
        title="Sacred Map"
        subtitle="All sacred locations across ancient lands"
      />
      <ChipRail
        options={ROUTE_CATEGORIES as unknown as string[]}
        active={active}
        onChange={handleFilterChange}
      />
      <View style={styles.mapArea}>
        <WebView
          ref={webRef}
          originWhitelist={['*']}
          source={{ html }}
          style={styles.web}
          onMessage={handleMessage}
          javaScriptEnabled
          domStorageEnabled
          mixedContentMode="always"
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loadingHost}>
              <ActivityIndicator color={palette.jadeBright} />
            </View>
          )}
          androidLayerType="hardware"
        />
      </View>
      {preview && (
        <View
          pointerEvents="box-none"
          style={[styles.previewWrap, { bottom: previewBottom }]}
        >
          <MapPreviewPanel
            site={preview}
            onClose={handleClosePreview}
            onOpen={() => {
              openSite(preview.id, 'map');
              setPreviewId(null);
              clearActive();
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  host: { flex: 1 },
  mapArea: {
    flex: 1,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: 22,
    overflow: 'hidden',
  },
  web: { flex: 1, backgroundColor: palette.voidDeep },
  loadingHost: {
    position: 'absolute',
    inset: 0,
    backgroundColor: palette.voidDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});
