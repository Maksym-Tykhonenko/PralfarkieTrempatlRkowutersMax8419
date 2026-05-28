import { useCallback, useEffect, useState } from 'react';
import { vaultSavedNotes, vaultSavedPlaces } from './sacredVault';

export const useSavedPlaces = () => {
  const [ids, setIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    vaultSavedPlaces.read().then(list => {
      setIds(list);
      setLoaded(true);
    });
  }, []);

  const toggle = useCallback(async (id: string) => {
    const next = await vaultSavedPlaces.toggle(id);
    setIds(next);
  }, []);

  const isSaved = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, isSaved, toggle, loaded };
};

export const useSavedNotes = () => {
  const [ids, setIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    vaultSavedNotes.read().then(list => {
      setIds(list);
      setLoaded(true);
    });
  }, []);

  const toggle = useCallback(async (id: string) => {
    const next = await vaultSavedNotes.toggle(id);
    setIds(next);
  }, []);

  const isSaved = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, isSaved, toggle, loaded };
};
