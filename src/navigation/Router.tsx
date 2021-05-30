import React from 'react';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { navigationRef } from 'navigation/RootNavigation';

import { commonScreens, CommonStackParamList } from 'screens';
import { myTheme } from '../../theme';
import RNBootSplash from 'react-native-bootsplash';
import CustomStatusBar from 'components/StatusBar';

const screenOptions: StackNavigationOptions = {
  safeAreaInsets: {
    top: 20,
  },
};

type ParamList = CommonStackParamList;

export const Stack = createStackNavigator<ParamList>();

const linking: LinkingOptions = {
  prefixes: ['RNOffGeoLoc://'],
  config: {
    screens: {},
  },
};

export default function Router() {
  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      onReady={() => {
        setTimeout(() => {
          RNBootSplash.hide({ fade: true }); // fade
        }, 3000);
      }}>
      <SafeAreaProvider>
        <CustomStatusBar
          barStyle="light-content"
          backgroundColor={myTheme.colors.secondary}
        />
        <Stack.Navigator screenOptions={screenOptions}>
          {Object.entries({
            // Use the screens normally
            ...commonScreens,
          }).map(([name, props]) => {
            return (
              <Stack.Screen
                key={name}
                name={name as keyof ParamList}
                {...props}
              />
            );
          })}
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
