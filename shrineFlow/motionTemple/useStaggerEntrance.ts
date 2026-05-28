import { useMemo } from 'react';
import { useEntranceFade } from './useEntranceFade';

export const useStaggerEntrance = (index: number, stepMs: number = 90, baseDelay: number = 80) => {
  const delay = useMemo(() => baseDelay + index * stepMs, [index, stepMs, baseDelay]);
  return useEntranceFade(delay, 560, 20);
};
