import { StyleSheet, View } from 'react-native';
import { MainText } from '../../../components/MainText';
import { ModeItem } from './ModeItem';
import { useAppSelector } from '../../../hooks/store';
import { DriveMode } from '../../../types';
import { useDevice } from '../../../hooks/useDevice';
import { Loading } from '../../../components/Loading';

export const Modes = () => {
  const { deviceParameters } = useAppSelector((state) => state.device);
  const { sendNewParameters } = useDevice();
  if (!deviceParameters) {
    return <Loading />;
  }

  const { mode } = deviceParameters;

  const isTheSameMode = (driveMode: DriveMode) => driveMode === mode;

  const selectNewMode = (driveMode: DriveMode) => {
    if (isTheSameMode(driveMode)) {
      return;
    }

    sendNewParameters({ mode: driveMode });
  };

  return (
    <View style={styles.container}>
      <MainText>Select one of the modes</MainText>
      <View style={styles.modeContainer}>
        <ModeItem
          isFocus={isTheSameMode(DriveMode.SOFT)}
          name="SOFT"
          handlePress={() => selectNewMode(DriveMode.SOFT)}
        />
        <ModeItem
          isFocus={isTheSameMode(DriveMode.NORMAL)}
          name="NORMAL"
          handlePress={() => selectNewMode(DriveMode.NORMAL)}
        />
        <ModeItem
          isFocus={isTheSameMode(DriveMode.RACE)}
          name="RACE"
          handlePress={() => selectNewMode(DriveMode.RACE)}
        />
        <ModeItem
          isFocus={isTheSameMode(DriveMode.DRIFT)}
          name="DRIFT"
          handlePress={() => selectNewMode(DriveMode.DRIFT)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  modeContainer: {
    marginTop: 24,
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
});
