import siteData from '../../rimpldasereta/arfispkcs';

export type SiteRecord = {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  coordinates: [number, number];
  short: string;
  long: string;
  image: any;
  category: string;
};

const NAME_TO_CATEGORY: Record<string, string> = {
  'Temple of Hercules': 'Ancient Temples',
  'Temple of Apollo': 'Ancient Temples',
  'Baalbek Temple Complex': 'Ancient Temples',
  'Temple Mount Southern Wall Area': 'Ancient Temples',
  'Saint Catherine’s Monastery': 'Desert Monasteries',
  'Mar Saba Monastery': 'Desert Monasteries',
  'Monastery of the Temptation': 'Desert Monasteries',
  'Deir Mar Musa': 'Desert Monasteries',
  Petra: 'Sacred Ruins',
  Masada: 'Sacred Ruins',
  Jerash: 'Sacred Ruins',
  'Caesarea Maritima': 'Sacred Ruins',
  'Mount Sinai Route': 'Biblical Routes',
  'Jerusalem Old City Route': 'Biblical Routes',
  'Sea of Galilee Sacred Route': 'Biblical Routes',
  'Bethlehem Heritage Route': 'Biblical Routes',
  'Meteora Monasteries': 'Stone Sanctuaries',
  'Göreme Open-Air Museum': 'Stone Sanctuaries',
  'Sumela Monastery': 'Stone Sanctuaries',
  'Qadisha Valley Monasteries': 'Stone Sanctuaries',
};

const slugify = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const sacredSiteList: SiteRecord[] = (siteData as any[]).map(item => ({
  id: slugify(item.name),
  name: item.name,
  country: item.country,
  city: item.city,
  address: item.address,
  coordinates: item.coordinates,
  short: item.short,
  long: item.long,
  image: item.image,
  category: NAME_TO_CATEGORY[item.name] ?? 'Ancient Temples',
}));

export const ROUTE_CATEGORIES = [
  'All',
  'Ancient Temples',
  'Desert Monasteries',
  'Sacred Ruins',
  'Biblical Routes',
  'Stone Sanctuaries',
] as const;

export const findSite = (id: string): SiteRecord | undefined =>
  sacredSiteList.find(s => s.id === id);

export const sitesByCategory = (category: string): SiteRecord[] => {
  if (category === 'All') return sacredSiteList;
  return sacredSiteList.filter(s => s.category === category);
};
