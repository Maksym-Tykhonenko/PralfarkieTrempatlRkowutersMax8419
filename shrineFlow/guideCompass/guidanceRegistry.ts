import guideRaw from '../../rimpldasereta/tavelergidac';
import { ImageSourcePropType } from 'react-native';

export type GuideTip = {
  id: string;
  name: string;
  subtitle: string;
  text: string;
  category: string;
  image: ImageSourcePropType;
};

const NAME_TO_CATEGORY: Record<string, string> = {
  'Temple Etiquette': 'Etiquette',
  'What to Wear': 'Clothing',
  'Photography Rules': 'Photography',
  'Safety Around Ruins': 'Safety',
  'Climate and Route Preparation': 'Climate',
  'Visiting Active Monasteries': 'Etiquette',
  'Reading Sacred Architecture': 'Culture',
  'Planning a Sacred Route': 'Routes',
  'Local Customs': 'Culture',
  'What to Pack': 'Routes',
};

const slugify = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const guideTipList: GuideTip[] = (guideRaw as any[]).map(item => ({
  id: slugify(item.name),
  name: item.name,
  subtitle: item.subtitle,
  text: item.text,
  category: NAME_TO_CATEGORY[item.name] ?? 'Routes',
  image: item.image,
}));

export const GUIDE_CATEGORIES = [
  'All',
  'Etiquette',
  'Clothing',
  'Photography',
  'Safety',
  'Climate',
  'Culture',
  'Routes',
] as const;

export const guideByCategory = (category: string): GuideTip[] => {
  if (category === 'All') return guideTipList;
  return guideTipList.filter(t => t.category === category);
};
