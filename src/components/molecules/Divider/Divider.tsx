import React from 'react';
import styled from 'styled-components/native';
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
  flexbox,
  FlexboxProps,
} from 'styled-system';
import { myTheme } from 'theme';
interface DividerProps
  extends LayoutProps,
    ColorProps,
    SpaceProps,
    BordersProps,
    FlexboxProps {}

const Divider = styled.View<DividerProps>`
  ${compose(color, layout, space, borders, flexbox)}
  background-color: ${myTheme.colors.grayLight};
  height: 1.3px;
`;

export default Divider;
