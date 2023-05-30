import { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MainText } from '../../MainText';
import { MainButton } from '../../MainButton';
import { SavedDeviceData } from '../../../types';
import { useBle } from '../../../hooks/useBle';
import { NavigationProps } from '../../../navigation';

interface Props {
  device: SavedDeviceData | undefined;
  closeModal: () => void;
}

export const ConnectDevice: FC<Props> = ({ device, closeModal }) => {
  const navigation = useNavigation<NavigationProps>();
  const { lookingForDevice, connectToDevice } = useBle();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (device) {
      lookingForDevice(device.id, () => {
        setDisabled(false);
      });
    }
  }, [device]);

  const handlePress = async () => {
    if (device) {
      await connectToDevice(device).then(() => {
        closeModal();
        navigation.navigate('DeviceDetails', { device });
      });
    }
  };

  return (
    <>
      <MainText style={{ marginBottom: 24 }}>
        {disabled ? 'Looking for device' : 'Ready to connect'}
      </MainText>
      <MainButton title="Connect" disabled={disabled} onPress={handlePress} />
    </>
  );
};
