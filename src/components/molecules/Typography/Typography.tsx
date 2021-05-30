import { log } from '@utils/console';
import React from 'react';
import { Text } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import {
  variant,
  LayoutProps,
  layout,
  compose,
  textStyle,
  TextStyleProps,
  space,
  SpaceProps,
  TypographyProps as TextProps,
  typography,
  color,
  ColorProps,
} from 'styled-system';
import { myTheme } from 'theme';

interface TypographyProps
  extends TextStyleProps,
    LayoutProps,
    SpaceProps,
    TextProps,
    ColorProps<typeof myTheme> {
  variant?: VariantTypes;
}

type VariantTypes = 'regular' | 'bold';

const variantStyle = (theme: DefaultTheme) => {
  return variant<TypographyProps, VariantTypes, 'variant'>({
    prop: 'variant',
    variants: {
      regular: {
        fontFamily: theme.typography.FONT_REGULAR,
      },
      bold: {
        fontFamily: theme.typography.FONT_BOLD,
      },
    },
  });
};

const Typography = styled(Text)<TypographyProps>`
  ${compose(layout, textStyle, space, typography, color)}
  ${({ theme }) => variantStyle(theme)}
`;

Typography.defaultProps = {
  color: 'primary',
  fontSize: 18,
};
export default Typography;
