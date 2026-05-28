import { ImageSourcePropType } from 'react-native';

export type SacredSlide = {
  id: string;
  title: string;
  text: string;
  background: ImageSourcePropType;
};

export const sacredSlideList: SacredSlide[] = [
  {
    id: 'explore',
    title: 'Explore Sacred History',
    text: 'Discover temples, monasteries, ruins, and ancient landmarks shaped by centuries of culture and architecture.',
    background: require('../../ritrupligsmtreu/afrakpasbronds/ornil1.png'),
  },
  {
    id: 'walk',
    title: 'Walk Temple Routes',
    text: 'Browse meaningful places through curated categories, from sacred ruins to desert sanctuaries.',
    background: require('../../ritrupligsmtreu/afrakpasbronds/ornil2.png'),
  },
  {
    id: 'reveal',
    title: 'Reveal a New Place',
    text: 'Use Scroll Pick to uncover a random destination and let the route guide your next discovery.',
    background: require('../../ritrupligsmtreu/afrakpasbronds/ornil3.png'),
  },
  {
    id: 'read',
    title: 'Read the Stories',
    text: 'Open Temple Notes to learn about architecture, traditions, symbolism, and sacred travel etiquette.',
    background: require('../../ritrupligsmtreu/afrakpasbronds/ornil4.png'),
  },
  {
    id: 'save',
    title: 'Save Meaningful Places',
    text: 'Build your own collection of historic destinations and revisit them whenever you plan your next journey.',
    background: require('../../ritrupligsmtreu/afrakpasbronds/ornil5.png'),
  },
];
