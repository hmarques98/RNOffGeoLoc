import { WINDOW_DEVICE_HEIGHT, WINDOW_DEVICE_WIDTH } from '@utils/constants';
import React from 'react';
import { Dimensions } from 'react-native';
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
  ButtonStyleProps,
  buttonStyle,
  PaddingProps,
  padding,
} from 'styled-system';
import { myTheme } from 'theme';

type VariantTypes = 'outlined' | 'rounded' | 'box' | 'disabled';

interface ButtonProps
  extends LayoutProps,
    ColorProps<typeof myTheme>,
    SpaceProps,
    BordersProps,
    FlexProps,
    PositionProps,
    FlexboxProps,
    ButtonStyleProps<typeof myTheme>,
    PaddingProps {
  children?: React.ReactNode;
  variant?: VariantTypes;
}

const variantStyle = (theme: DefaultTheme, disabled: boolean) => {
  return variant<ButtonProps, VariantTypes, 'variant'>({
    key: 'button',
    prop: 'variant',
    variants: {
      box: {
        width: '100%',
        height: '100%',
      },
      outlined: {
        borderColor: 'primary',
        borderWidth: 1,
        borderStyle: 'solid',
      },
      rounded: {
        borderRadius: 8,
      },
      disabled: {
        backgroundColor: 'black',
      },
    },
  });
};

const Button = styled.TouchableOpacity<ButtonProps>`
  ${compose(
    color,
    space,
    borders,
    flex,
    position,
    flexbox,
    buttonStyle,
    padding,
  )}

  ${({ theme, disabled }) => variantStyle(theme, !!disabled)}
`;

export default Button;
