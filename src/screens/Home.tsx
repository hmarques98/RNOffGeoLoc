import { Box } from 'components/molecules/Box';
import { Typography } from 'components/molecules/Typography';
import { Button } from 'components/molecules/Button';
import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { myTheme } from 'theme';
import { CommonStackParamList } from 'src/screens';
import { StackNavigationProp } from '@react-navigation/stack';
import useLocation from 'hooks/useLocation';
import { PADDING } from 'styles/spacing';

type ProfileScreenNavigationProp = StackNavigationProp<
  CommonStackParamList,
  'Home'
>;

const HomeScreen = () => {
  const { location, getLocationUpdates, toggleObserving, isObserving } =
    useLocation();

  useEffect(() => {
    getLocationUpdates();
  }, [getLocationUpdates]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <Box flex={1} alignItems="center" paddingTop={PADDING}>
        {location.coords && (
          <>
            <Typography>{location?.coords.altitude}</Typography>
            <Typography>{location?.coords.longitude}</Typography>
            <Typography>{location?.coords.latitude}</Typography>
            <Typography>{location?.coords.speed}</Typography>
          </>
        )}

        <Button onPress={getLocationUpdates}>
          <Typography>Location in live</Typography>
        </Button>
        <Button onPress={toggleObserving}>
          <Typography>{isObserving ? 'Active' : 'Not active'}</Typography>
        </Button>
      </Box>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: myTheme.colors.white,
  },
});
