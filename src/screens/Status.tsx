import React from 'react';
import { Box } from 'components/molecules/Box';
import { Typography } from 'components/molecules/Typography';
import { StackScreenProps } from '@react-navigation/stack';
import { CommonStackParamList } from 'src/screens';
import useHeader from 'hooks/useHeader';
import { Divider } from 'components/molecules/Divider';
import { useSelector } from 'react-redux';
import { locationStateSelector } from '@store/slices';

import { FlatList } from 'react-native-gesture-handler';
import useKeysPackage from 'hooks/useKeysPackage';
type Props = StackScreenProps<CommonStackParamList, 'Status'>;

const StatusScreen = ({ navigation, route }: Props) => {
  useHeader(route.name);
  useKeysPackage();

  const { points, keys, loadedAll } = useSelector(locationStateSelector);

  return (
    <Box flex={1} py={3} bg={'white'} px={3}>
      {loadedAll && (
        <FlatList
          ListEmptyComponent={() => (
            <Typography>Nenhum pacote encontrado</Typography>
          )}
          showsVerticalScrollIndicator={false}
          data={points
            .slice()
            .sort((a, b) => Number(b?.time) - Number(a?.time))}
          renderItem={({ item }) => (
            <CardPoint
              time={item.time}
              key={item.id}
              id={String(item.id)}
              completed={Boolean(keys.includes(item.id))}
            />
          )}
          ListFooterComponent={() => <Divider my={3} />}
        />
      )}
    </Box>
  );
};

type CardPointProps = {
  id: string;
  completed: boolean;
  time: string;
};

const CardPoint = ({ id, completed, time }: CardPointProps) => {
  return (
    <>
      <Divider my={3} />
      <Box flexDirection="row" justifyContent="space-between">
        <Box>
          <Typography color={'black'}>Pacote ID: {id}</Typography>
          <Typography color={'black'} fontSize={1} mt={2}>
            {completed ? 'Pacote sincronizado' : 'Pendente de sincronização'}
          </Typography>
        </Box>
        <Typography color={'grayLight'} fontSize={1}>
          {new Date(Number(time)).toLocaleTimeString('pt-BR', {
            timeZone: 'America/Fortaleza',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </Box>
    </>
  );
};

export default StatusScreen;
