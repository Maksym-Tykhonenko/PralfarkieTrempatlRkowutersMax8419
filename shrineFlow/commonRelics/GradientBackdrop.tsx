import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { palette } from '../themeStone/palette';

type Props = {
  colors?: string[];
  locations?: number[];
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
};

export const GradientBackdrop: React.FC<Props> = ({
  colors = [palette.voidDeep, palette.voidMid, palette.voidDeep],
  locations,
  style,
  children,
}) => {
  return (
    <View style={[styles.host, style]}>
      <LinearGradient
        colors={colors}
        locations={locations}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  host: { flex: 1, backgroundColor: palette.voidDeep },
});
