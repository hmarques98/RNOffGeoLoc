import { useNetInfo } from '@react-native-community/netinfo';
import { locationStateSelector } from '@store/slices';
import { saveKeys } from '@store/slices/location';
import useReactQuery from 'hooks/useReactQuery';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useKeysPackage = () => {
  const { data, refetch } = useReactQuery<{ keys: string[] }>({
    path: 'points',
    queryName: 'points',
  });

  const dispatch = useDispatch();
  const { isConnected } = useNetInfo();

  const { points } = useSelector(locationStateSelector);

  useEffect(() => {
    if (data?.keys) {
      dispatch(saveKeys(data?.keys));
    } else {
      dispatch(saveKeys([]));
    }
  }, [data?.keys, dispatch]);

  useEffect(() => {
    refetch();
  }, [refetch, points]);

  useEffect(() => {
    refetch();
  }, [refetch, isConnected]);
};

export default useKeysPackage;
