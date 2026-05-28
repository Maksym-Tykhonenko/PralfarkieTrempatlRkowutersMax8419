import { Platform, TextStyle } from 'react-native';

export const heritageFont = {
  black: Platform.select({ ios: 'Cinzel-Black', android: 'Cinzel-Black' }) as string,
  bold: Platform.select({ ios: 'Cinzel-Bold', android: 'Cinzel-Bold' }) as string,
  medium: Platform.select({ ios: 'Cinzel-Medium', android: 'Cinzel-Medium' }) as string,
  regular: Platform.select({ ios: 'Cinzel-Regular', android: 'Cinzel-Regular' }) as string,
};

export const bodyFont = {
  regular: Platform.select({ ios: 'System', android: 'sans-serif' }) as string,
  medium: Platform.select({ ios: 'System', android: 'sans-serif-medium' }) as string,
};

export const inscription = (size: number, weight: 'regular' | 'medium' | 'bold' | 'black' = 'bold'): TextStyle => ({
  fontFamily: heritageFont[weight],
  fontSize: size,
  letterSpacing: size > 18 ? 1.4 : 1.1,
});

export const bodyText = (size: number = 14, weight: 'regular' | 'medium' = 'regular'): TextStyle => ({
  fontFamily: bodyFont[weight],
  fontSize: size,
  letterSpacing: 0.2,
});
