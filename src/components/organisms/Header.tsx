import { RouteProp } from '@react-navigation/core';
import { StackHeaderProps } from '@react-navigation/stack';
import { log } from '@utils/console';
import { Box } from 'components/molecules/Box';
import { Button } from 'components/molecules/Button';
import { Typography } from 'components/molecules/Typography';
import React from 'react';
import { CommonStackParamList } from 'src/screens';
import { GRAY_LIGHT, PRIMARY, WHITE } from 'styles/colors';
import { PADDING } from 'styles/spacing';

const Header = (props: StackHeaderProps) => {
  const { insets, layout, navigation, scene, previous } = props;
  const { route } = scene;

  return (
    <Box height={80} backgroundColor={PRIMARY}>
      <Box
        marginTop={insets.top}
        flexDirection="row"
        justifyContent={!previous?.route ? 'space-between' : 'flex-start'}
        px={PADDING}
        flex={1}
        bg="green">
        {route.name === 'Home' && (
          <Box flex={1}>
            <Typography color={GRAY_LIGHT}>Olá, bem-vindo</Typography>
          </Box>
        )}

        {previous?.route && (
          <Button onPress={navigation.goBack}>
            <Typography color={WHITE}>Voltar</Typography>
          </Button>
        )}

        {route.name !== 'Home' ? (
          <Box bg="red" alignItems="center">
            <Typography color={GRAY_LIGHT}>{route.name}</Typography>
          </Box>
        ) : (
          <Box flex={1} />
        )}

        {route.name === 'Home' && (
          <Button
            onPress={() =>
              navigation.push<keyof CommonStackParamList>('Status')
            }
            alignItems="flex-end">
            <Typography color="#fff">Status</Typography>
          </Button>
        )}
      </Box>
    </Box>
  );
};
export default Header;
