import HomeScreen from 'screens/Home';
import StatusScreen from 'screens/StatusScreen';

export type CommonStackParamList = {
  Home: undefined;
  Status: undefined;
};

export const commonScreens = {
  Home: { component: HomeScreen },
  Status: { component: StatusScreen },
};
