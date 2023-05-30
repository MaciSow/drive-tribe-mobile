import { StyleSheet, View } from 'react-native';
import { MainText } from '../../../components/MainText';
import { MainButton } from '../../../components/MainButton';
import { useDevice } from '../../../hooks/useDevice';
import { useAppSelector } from '../../../hooks/store';
import { Loading } from '../../../components/Loading';

export const Lock = () => {
  const { sendNewParameters } = useDevice();
  const { deviceParameters } = useAppSelector((state) => state.device);
  if (!deviceParameters) {
    return <Loading />;
  }

  const { isLock } = deviceParameters;

  const handlePress = () => {
    sendNewParameters({ isLock: !isLock });
  };

  return (
    <View style={styles.container}>
      <MainText style={{ marginBottom: 24 }}>Press long to {isLock ? 'unlock' : 'lock'}</MainText>
      <MainButton onLongPress={handlePress} title={isLock ? 'UNLOCK' : 'LOCK'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
