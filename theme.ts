import { DefaultTheme } from 'styled-components';
import { colors, spacing, typography } from './src/styles/index';

const myTheme: DefaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  colors: {
    primary: colors.PRIMARY,
    secondary: colors.SECONDARY,
    black: colors.BLACK,
    white: colors.WHITE,
    green: colors.GREEN,
    grayLight: colors.GRAY_LIGHT,
    success: colors.SUCCESS,
    greenOpacity: colors.GREEN_OPACITY,
  },
  typography: {
    FONT_REGULAR: typography.FONT_FAMILY_REGULAR,
    FONT_BOLD: typography.FONT_FAMILY_BOLD,
  },
  borderWidths: [0, 2, 4, 8, 16],
  bordersColors: {
    primary: colors.PRIMARY,
    secondary: colors.SECONDARY,
    black: colors.BLACK,
    white: colors.WHITE,
    green: colors.GREEN,
    grayLight: colors.GRAY_LIGHT,
    success: colors.SUCCESS,
    greenOpacity: colors.GREEN_OPACITY,
  },
  radii: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

export { myTheme };
