import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const TAB_BAR_PAD_TOP = 14;
export const TAB_BAR_ITEM_HEIGHT = 56;
export const TAB_BAR_PAD_BOTTOM_MIN = 10;

export const useTabBarMetrics = () => {
  const insets = useSafeAreaInsets();
  const padBottom = Math.max(insets.bottom, TAB_BAR_PAD_BOTTOM_MIN);
  const total = TAB_BAR_PAD_TOP + TAB_BAR_ITEM_HEIGHT + padBottom;
  return {
    total,
    padTop: TAB_BAR_PAD_TOP,
    padBottom,
    safeBottom: insets.bottom,
  };
};
