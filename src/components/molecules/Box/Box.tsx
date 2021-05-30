import React from 'react';
import styled, { DefaultTheme } from 'styled-components/native';
import {
  LayoutProps,
  layout,
  compose,
  ColorProps,
  color,
  space,
  SpaceProps,
  BordersProps,
  borders,
  variant,
  FlexProps,
  flex,
  flexbox,
  FlexboxProps,
  position,
  PositionProps,
} from 'styled-system';
import { myTheme } from 'theme';
type VariantTypes = 'primary' | 'secondary';
interface BoxProps
  extends LayoutProps,
    ColorProps<typeof myTheme>,
    SpaceProps<typeof myTheme>,
    BordersProps,
    FlexProps,
    PositionProps,
    FlexboxProps {
  children?: React.ReactNode;
  bgVariant?: VariantTypes;
}

const variantStyle = (theme: DefaultTheme) => {
  return variant<BoxProps, VariantTypes, 'bgVariant'>({
    key: 'box',
    prop: 'bgVariant',
    variants: {
      primary: {
        backgroundColor: 'primary',
      },
      secondary: {
        backgroundColor: 'secondary',
      },
    },
  });
};

const Box = styled.View<BoxProps>`
  ${compose(color, layout, space, borders, flex, position, flexbox)}
  ${({ theme }) => variantStyle(theme)}
`;

export default Box;
