import React from 'react';
import { Box } from 'components/molecules/Box';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PADDING } from 'styles/spacing';
import { StatusBar, StyleSheet } from 'react-native';
import { myTheme } from 'theme';
import { Typography } from 'components/molecules/Typography';
import { StackScreenProps } from '@react-navigation/stack';
import { CommonStackParamList } from 'src/screens';
import useHeader from 'hooks/useHeader';
import { WHITE } from 'styles/colors';

type Props = StackScreenProps<CommonStackParamList, 'Status'>;

const StatusScreen = ({ navigation, route }: Props) => {
  useHeader(route.name);
  return (
    <Box flex={1} alignItems="center" paddingTop={PADDING} bg={WHITE}>
      <Typography>status</Typography>
    </Box>
  );
};

export default StatusScreen;
