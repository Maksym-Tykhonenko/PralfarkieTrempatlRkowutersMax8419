export const palette = {
  voidDeep: '#040814',
  voidMid: '#0A1224',
  voidSoft: '#101A32',
  parchment: '#F2E7D0',
  parchmentSoft: '#E0D6BE',
  fogBlue: '#7B8AA8',
  fogSoft: '#A8B3CC',
  jadeBright: '#5DBDA7',
  jade: '#3F9C87',
  jadeDeep: '#2D7A68',
  emberGold: '#E0B973',
  emberAmber: '#C99550',
  shadow: 'rgba(0,0,0,0.55)',
  veil: 'rgba(8,12,28,0.72)',
  glass: 'rgba(20,32,58,0.55)',
  glassEdge: 'rgba(255,255,255,0.06)',
  hairline: 'rgba(226,210,178,0.18)',
  hairlineSoft: 'rgba(226,210,178,0.08)',
  danger: '#D67168',
};

export const radii = {
  pill: 999,
  card: 22,
  chip: 18,
  tiny: 10,
  large: 30,
};

export const spacing = {
  micro: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 40,
};

export const shadows = {
  cinematic: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.55,
    shadowRadius: 22,
    elevation: 10,
  },
  glow: {
    shadowColor: palette.jadeBright,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 18,
    elevation: 8,
  },
  ember: {
    shadowColor: palette.emberGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 6,
  },
};

export const categoryGradients: Record<string, [string, string]> = {
  'Ancient Temples': ['#1A1F36', '#3A2F1E'],
  'Desert Monasteries': ['#2A1B2E', '#1A0F22'],
  'Sacred Ruins': ['#2D1A1A', '#1C0E0E'],
  'Biblical Routes': ['#1A2330', '#0E1626'],
  'Stone Sanctuaries': ['#1A2A2A', '#0E1818'],
};

export const categoryAccents: Record<string, string> = {
  'Ancient Temples': '#E0B973',
  'Desert Monasteries': '#B07AC4',
  'Sacred Ruins': '#D67168',
  'Biblical Routes': '#7AB8E0',
  'Stone Sanctuaries': '#5DBDA7',
};
