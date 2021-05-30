import { Box } from 'components/molecules/Box';
import { Typography } from 'components/molecules/Typography';
import { Button } from 'components/molecules/Button';
import React, { useEffect, useState } from 'react';

import { CommonStackParamList } from 'src/screens';
import { StackScreenProps } from '@react-navigation/stack';
import useLocation from 'hooks/useLocation';
import { PADDING } from 'styles/spacing';
import { useDispatch, useSelector } from 'react-redux';
import { callUsers } from '@store/slices/location';
import { offlineStateSelector } from '@store/slices';
import useHeader from 'hooks/useHeader';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'components/molecules/Divider';
import { Switch } from 'react-native-gesture-handler';
import { PRIMARY } from 'styles/colors';
type Props = StackScreenProps<CommonStackParamList, 'Home'>;
const HomeScreen = ({ navigation, route }: Props) => {
  useHeader(route.name);

  const [timer, setTimer] = useState(10);
  const [isServiceActive, setIsServiceActive] = useState(false);

  return (
    <Box flex={1} paddingTop={PADDING} bg={'white'}>
      <Box flexDirection="row" px={3}>
        <Box borderWidth={3} borderColor={''} borderRadius={100} padding={2}>
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
          <Typography color={isServiceActive ? 'green' : 'grayLight'}>
            {isServiceActive ? 'Online' : 'Offline'}
          </Typography>
        </Box>
      </Box>

      <Divider my={3} />

      <Box flexDirection="row" justifyContent="space-between" mb={4} px={3}>
        <Box>
          <Typography>Status do serviço</Typography>
          <Typography fontSize={1} color="grayLight">
            Serviço ativo
          </Typography>
        </Box>
        <Switch value={isServiceActive} onValueChange={setIsServiceActive} />
      </Box>
      <Box px={3}>
        <Typography>Intervalo de comunicação</Typography>
        <Box flexDirection="row" justifyContent="space-between">
          {[10, 5, 3, 1].map((value) => {
            return (
              <CardTimer
                key={value}
                active={value === timer}
                value={value}
                onPress={() => setTimer(value)}
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
      borderRadius={3}
      padding={3}>
      <Typography color={active ? 'black' : 'grayLight'}>{value}s</Typography>
    </Button>
  );
};
export default HomeScreen;
