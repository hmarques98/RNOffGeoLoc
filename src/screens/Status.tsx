import React, { useCallback, useEffect, useState } from 'react';
import { Box } from 'components/molecules/Box';
import { Typography } from 'components/molecules/Typography';
import { StackScreenProps } from '@react-navigation/stack';
import { CommonStackParamList } from 'src/screens';
import useHeader from 'hooks/useHeader';
import { Divider } from 'components/molecules/Divider';
import useReactQuery from 'hooks/useReactQuery';
import { log } from '@utils/console';
import { getPointsById } from '@store/slices/location';
import { useDispatch, useSelector } from 'react-redux';
import { locationStateSelector } from '@store/slices';
type Props = StackScreenProps<CommonStackParamList, 'Status'>;

const StatusScreen = ({ navigation, route }: Props) => {
  useHeader(route.name);

  const dispatch = useDispatch();
  const { points } = useSelector(locationStateSelector);

  const { data } = useReactQuery<{ keys: string[] }>({
    path: 'points',
    queryName: 'points',
  });

  const getPoints = useCallback(async () => {
    data?.keys.map(async (item) => {
      try {
        dispatch(getPointsById(item));
      } catch (error) {
        log({ error });
      }
    });
  }, [data?.keys, dispatch]);

  useEffect(() => {
    getPoints();
  }, [getPoints]);

  return (
    <Box flex={1} py={3} bg={'white'} px={3}>
      {points.map((value) => {
        return <CardPoint key={value.id} id={String(value.id)} />;
      })}
      <Divider my={3} />
    </Box>
  );
};

type CardPointProps = {
  id: string;
};

const CardPoint = ({ id }: CardPointProps) => {
  return (
    <>
      <Divider my={3} />
      <Box flexDirection="row" justifyContent="space-between">
        <Box>
          <Typography color={'black'}>Pacote ID: {id}</Typography>
          <Typography color={'black'} fontSize={1} mt={2}>
            Pendente de sicronizar
          </Typography>
        </Box>
        <Typography color={'black'} fontSize={1}>
          {new Date(1622505622).toLocaleTimeString('pt-BR', {
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
