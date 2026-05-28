import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type JourneyTab = 'routes' | 'map' | 'scroll' | 'notes' | 'saved' | 'guidance';

type DetailView =
  | { kind: 'none' }
  | { kind: 'site'; id: string; from: JourneyTab }
  | { kind: 'note'; id: string; from: JourneyTab };

export type MapFocusRequest = { id: string; ts: number };

type JourneyState = {
  activeTab: JourneyTab;
  setActiveTab: (tab: JourneyTab) => void;
  detail: DetailView;
  openSite: (id: string, from?: JourneyTab) => void;
  openNote: (id: string, from?: JourneyTab) => void;
  closeDetail: () => void;
  mapFocus: MapFocusRequest | null;
  requestMapFocus: (id: string) => void;
  clearMapFocus: () => void;
};

const JourneyContext = createContext<JourneyState | null>(null);

export const JourneyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<JourneyTab>('routes');
  const [detail, setDetail] = useState<DetailView>({ kind: 'none' });
  const [mapFocus, setMapFocus] = useState<MapFocusRequest | null>(null);

  const openSite = useCallback(
    (id: string, from: JourneyTab = activeTab) => setDetail({ kind: 'site', id, from }),
    [activeTab],
  );
  const openNote = useCallback(
    (id: string, from: JourneyTab = activeTab) => setDetail({ kind: 'note', id, from }),
    [activeTab],
  );
  const closeDetail = useCallback(() => setDetail({ kind: 'none' }), []);

  const requestMapFocus = useCallback(
    (id: string) => setMapFocus({ id, ts: Date.now() }),
    [],
  );
  const clearMapFocus = useCallback(() => setMapFocus(null), []);

  const value = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      detail,
      openSite,
      openNote,
      closeDetail,
      mapFocus,
      requestMapFocus,
      clearMapFocus,
    }),
    [activeTab, detail, openSite, openNote, closeDetail, mapFocus, requestMapFocus, clearMapFocus],
  );

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
};

export const useJourney = (): JourneyState => {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error('useJourney must be used inside JourneyProvider');
  return ctx;
};
