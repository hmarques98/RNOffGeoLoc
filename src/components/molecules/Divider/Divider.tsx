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
  flexbox,
  FlexboxProps,
} from 'styled-system';
import { myTheme } from 'theme';

type VariantTypes = 'full' | 'spacing';

interface DividerProps
  extends LayoutProps,
    ColorProps,
    SpaceProps,
    BordersProps,
    FlexboxProps {
  variant?: VariantTypes;
}

const variantStyle = () => {
  return variant<DividerProps, VariantTypes, 'variant'>({
    key: 'divider',
    prop: 'variant',
    variants: {
      full: {
        backgroundColor: myTheme.colors.grayLight,
      },
      spacing: {
        marginX: 3,

        backgroundColor: myTheme.colors.grayLight,
      },
    },
  });
};

const Divider = styled.View<DividerProps>`
  ${compose(color, layout, space, borders, flexbox)}
  ${() => variantStyle()}
`;
Divider.defaultProps = {
  height: 1.3,
  marginY: 4,
};

export default Divider;
