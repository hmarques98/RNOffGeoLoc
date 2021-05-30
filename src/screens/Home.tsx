import { Box } from 'components/molecules/Box';
import { Typography } from 'components/molecules/Typography';
import { Button } from 'components/molecules/Button';
import React, { useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { myTheme } from 'theme';
import { CommonStackParamList } from 'src/screens';
import { StackScreenProps } from '@react-navigation/stack';
import useLocation from 'hooks/useLocation';
import { PADDING } from 'styles/spacing';
import { useDispatch, useSelector } from 'react-redux';
import { callUsers } from '@store/slices/location';
import { offlineStateSelector } from '@store/slices';
import useHeader from 'hooks/useHeader';
import { WHITE } from 'styles/colors';
type Props = StackScreenProps<CommonStackParamList, 'Home'>;
const HomeScreen = ({ navigation, route }: Props) => {
  useHeader(route.name);
  const { location, getLocationUpdates, toggleObserving, isObserving } =
    useLocation();

  const offlineState = useSelector(offlineStateSelector);

  useEffect(() => {
    getLocationUpdates();
  }, [getLocationUpdates]);

  const dispatch = useDispatch();

  return (
    <Box flex={1} alignItems="center" paddingTop={PADDING} bg={WHITE}>
      {location.coords && (
        <>
          <Typography>{location?.coords.altitude}</Typography>
          <Typography>{location?.coords.longitude}</Typography>
          <Typography>{location?.coords.latitude}</Typography>
          <Typography>{location?.coords.speed}</Typography>
        </>
      )}

      <Button onPress={toggleObserving}>
        <Typography>{isObserving ? 'Active' : 'Not active'}</Typography>
      </Button>
      <Button
        onPress={() => {
          dispatch(callUsers('path'));
        }}>
        <Typography>Prepare</Typography>
      </Button>
      {/* <Button
          onPress={() => {
            dispatch(fetchApi());
          }}>
          <Typography>Thunk</Typography>
        </Button> */}
    </Box>
  );
};
export default HomeScreen;
