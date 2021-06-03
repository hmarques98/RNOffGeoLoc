import { Box } from 'components/molecules/Box';
import { Typography } from 'components/molecules/Typography';
import { Button } from 'components/molecules/Button';
import React, { useCallback, useEffect, useRef } from 'react';

import { CommonStackParamList } from 'src/screens';
import { StackScreenProps } from '@react-navigation/stack';
import useLocation from 'hooks/useLocation';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeTimer,
  getPointsById,
  toggleService,
  handleLoad,
} from '@store/slices/location';
import { locationStateSelector } from '@store/slices';
import useHeader from 'hooks/useHeader';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'components/molecules/Divider';
import { Switch } from 'react-native-gesture-handler';
import { PRIMARY } from 'styles/colors';
import { useNetInfo } from '@react-native-community/netinfo';
import { log } from '@utils/console';
import useKeysPackage from 'hooks/useKeysPackage';

type Props = StackScreenProps<CommonStackParamList, 'Home'>;

const milliseconds = 1000;
const HomeScreen = ({ navigation, route }: Props) => {
  useHeader(route.name);
  useLocation();
  useKeysPackage();

  const { timer, isServiceActive, keys } = useSelector(locationStateSelector);
  const { isConnected } = useNetInfo();
  const dispatch = useDispatch();

  const loadedFirsTime = useRef<boolean>(false);

  const getPoints = useCallback(async () => {
    dispatch(handleLoad(true));
    keys?.map(async (item, index) => {
      try {
        dispatch(getPointsById(item));
        if (index === keys.length - 1) {
          dispatch(handleLoad(true));
          loadedFirsTime.current = true;
        }
      } catch (error) {
        log({ error });
      }
    });
  }, [keys, dispatch]);

  useEffect(() => {
    if (!loadedFirsTime.current) {
      getPoints();
    }
  }, [getPoints]);

  return (
    <Box flex={1} paddingTop={3} bg="white">
      <Box flexDirection="row" px={3}>
        <Box borderWidth={1} borderColor="primary" borderRadius={4} padding={2}>
          <MaterialCommunityIcons
            name="cards-diamond-outline"
            size={40}
            color={PRIMARY}
            style={{
              transform: [{ rotate: '45deg' }],
            }}
          />
        </Box>
        <Box ml={3}>
          <Typography>My GPS - Tracking</Typography>
          <Typography color={isConnected ? 'green' : 'grayLight'}>
            {isConnected ? 'Online' : 'Offline'}
          </Typography>
        </Box>
      </Box>

      <Divider my={3} />

      <Box flexDirection="row" justifyContent="space-between" mb={3} px={3}>
        <Box>
          <Typography>Status do serviço</Typography>
          <Typography fontSize={1} color="grayLight">
            Serviço {isServiceActive ? 'ativo' : 'desativado'}
          </Typography>
        </Box>
        <Switch
          value={isServiceActive}
          onValueChange={() => dispatch(toggleService())}
        />
      </Box>
      <Box px={3}>
        <Typography>Intervalo de comunicação</Typography>
        <Box flexDirection="row" justifyContent="space-between" mt={3}>
          {[10, 5, 3, 1].map((value) => {
            return (
              <CardTimer
                key={value}
                active={value === timer / milliseconds}
                value={value}
                onPress={() => dispatch(changeTimer(value * milliseconds))}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

const CardTimer = ({
  active,
  value,
  onPress,
}: {
  active: boolean;
  value: number;
  onPress(): void;
}) => {
  return (
    <Button
      hitSlop={{
        bottom: 20,
        top: 20,
        left: 20,
        right: 20,
      }}
      onPress={onPress}
      borderWidth={1}
      borderColor={active ? 'success' : 'grayLight'}
      bg={active ? 'greenOpacity' : 'white'}
      borderRadius={2}
      padding={3}>
      <Typography color={active ? 'black' : 'grayLight'}>{value}s</Typography>
    </Button>
  );
};
export default HomeScreen;
