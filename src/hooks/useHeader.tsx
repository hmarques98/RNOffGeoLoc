import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';

import { CommonStackParamList } from 'screens';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { Typography } from 'components/molecules/Typography';
import { Box } from 'components/molecules/Box';
import { myTheme } from 'theme';
import { GRAY_LIGHT, WHITE } from 'styles/colors';
import { Button } from 'components/molecules/Button';
import { StackNavigationProp } from '@react-navigation/stack';

type ScreeName = keyof CommonStackParamList;

export default function useHeader(screen: ScreeName) {
  const navigation = useNavigation<StackNavigationProp<any>>();

  useLayoutEffect(() => {
    switch (screen) {
      case 'Home':
        navigation.setOptions({
          headerTitle: '',

          headerStyle: {
            backgroundColor: myTheme.colors.primary,
          },

          headerLeft: () => {
            return (
              <Box px={3}>
                <Typography color={GRAY_LIGHT}>Olá, bem-vindo</Typography>
              </Box>
            );
          },
          headerRight: () => {
            return (
              <Button
                px={3}
                onPress={() =>
                  navigation.push<keyof CommonStackParamList>('Status')
                }>
                <Typography color="#fff">Status</Typography>
              </Button>
            );
          },
        });
        break;
      case 'Status':
        navigation.setOptions({
          headerTitle: 'Status',
          headerTitleStyle: {
            color: GRAY_LIGHT,
          },

          headerStyle: {
            backgroundColor: myTheme.colors.primary,
          },

          headerLeft: () => {
            return (
              <Button px={3} onPress={navigation.goBack}>
                <Typography color={WHITE}>Voltar</Typography>
              </Button>
            );
          },
        });
      default:
        break;
    }
  }, [navigation, screen]);
}
