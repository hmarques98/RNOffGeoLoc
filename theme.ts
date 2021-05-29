import { DefaultTheme } from 'styled-components';
import { colors, spacing, typography } from './src/styles/index';

const myTheme: DefaultTheme = {
  spacing: {
    borderRadius: spacing.RADIUS,
    border: spacing.BORDER,
    margin: spacing.MARGIN,
    padding: spacing.PADDING,
  },
  colors: {
    primary: colors.PRIMARY,
    secondary: colors.SECONDARY,
    black: colors.BLACK,
    white: colors.WHITE,
    green: colors.GREEN,
    grayLight: colors.GRAY_LIGHT,
    success: colors.SUCCESS,
  },
  typography: {
    FONT_REGULAR: typography.FONT_FAMILY_REGULAR,
    FONT_BOLD: typography.FONT_FAMILY_BOLD,
  },
};

export { myTheme };
