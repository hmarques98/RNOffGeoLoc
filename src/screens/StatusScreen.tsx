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
import { BLACK, WHITE } from 'styles/colors';
import { Divider } from 'components/molecules/Divider';

type Props = StackScreenProps<CommonStackParamList, 'Status'>;

const StatusScreen = ({ navigation, route }: Props) => {
  useHeader(route.name);
  return (
    <Box flex={1} paddingTop={PADDING} bg={WHITE} px={3}>
      <Divider margin={0} />

      <Box flexDirection="row" justifyContent="space-between">
        <Box>
          <Typography color={BLACK}>Pacote ID: XXXXXX</Typography>
          <Typography color={BLACK} fontSize={1} mt={2}>
            Pendente de sicronizar
          </Typography>
        </Box>
        <Typography color={BLACK} fontSize={1}>
          12:30
        </Typography>
      </Box>
    </Box>
  );
};

export default StatusScreen;
