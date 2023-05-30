import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainText } from '../../../components/MainText';
import { BottomTabParamList } from '../../../navigation';
import { DriveMode, SavedDeviceData } from '../../../types';
import { useAppSelector } from '../../../hooks/store';
import { MainButton } from '../../../components/MainButton';
import { useBle } from '../../../hooks/useBle';
import { useDevice } from '../../../hooks/useDevice';

export interface DeviceDetailsProps {
  device: SavedDeviceData;
}

type DeviceDetailsRouteProp = RouteProp<BottomTabParamList, 'Details'>;

export const Details = () => {
  const { connectedDevice, deviceParameters } = useAppSelector((state) => state.device);
  const { disconnectFromDevice } = useBle();
  const { sendNewParameters, readAllParameters } = useDevice();

  useEffect(() => {
    console.log(connectedDevice);
    if (connectedDevice) {
      readAllParameters();
    }
  }, [connectedDevice]);

  const route = useRoute<DeviceDetailsRouteProp>();
  const {
    device: { id, name },
  } = route.params;

  const handleSend = () => sendNewParameters({ isLock: false, mode: DriveMode.SOFT });

  return (
    <View style={styles.container}>
      <MainText style={styles.mainText}>{JSON.stringify(connectedDevice) ?? 'EMPTY'}</MainText>
      <MainText style={styles.mainText}>{JSON.stringify(deviceParameters) ?? 'EMPTY'}</MainText>
      <View style={styles.buttonContainer}>
        <MainButton title="Send" onPress={handleSend} />
        <MainButton title="Read" onPress={readAllParameters} />
        <MainButton title="DISCONNECT" onPress={disconnectFromDevice} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainText: {
    marginBottom: 48,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
