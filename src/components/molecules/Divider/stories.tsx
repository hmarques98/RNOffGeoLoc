import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Box from '../Box/Box';
import Divider from './Divider';

storiesOf('Divider', module)
  .add('Full divider', () => <Divider variant="full" />)
  .add('Spacing divider', () => {
    return <Divider variant="spacing" />;
  });
