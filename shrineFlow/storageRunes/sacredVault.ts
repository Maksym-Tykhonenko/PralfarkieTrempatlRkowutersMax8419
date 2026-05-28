import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_ONBOARDING = '@shrineFlow/onboardingDone';
const KEY_SAVED_PLACES = '@shrineFlow/savedPlaces';
const KEY_SAVED_NOTES = '@shrineFlow/savedNotes';

export const vaultOnboarding = {
  async read(): Promise<boolean> {
    try {
      const raw = await AsyncStorage.getItem(KEY_ONBOARDING);
      return raw === '1';
    } catch {
      return false;
    }
  },
  async markDone(): Promise<void> {
    try {
      await AsyncStorage.setItem(KEY_ONBOARDING, '1');
    } catch {}
  },
};

const readList = async (key: string): Promise<string[]> => {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeList = async (key: string, list: string[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(list));
  } catch {}
};

export const vaultSavedPlaces = {
  read: () => readList(KEY_SAVED_PLACES),
  async toggle(id: string): Promise<string[]> {
    const list = await readList(KEY_SAVED_PLACES);
    const next = list.includes(id) ? list.filter(x => x !== id) : [...list, id];
    await writeList(KEY_SAVED_PLACES, next);
    return next;
  },
};

export const vaultSavedNotes = {
  read: () => readList(KEY_SAVED_NOTES),
  async toggle(id: string): Promise<string[]> {
    const list = await readList(KEY_SAVED_NOTES);
    const next = list.includes(id) ? list.filter(x => x !== id) : [...list, id];
    await writeList(KEY_SAVED_NOTES, next);
    return next;
  },
};
