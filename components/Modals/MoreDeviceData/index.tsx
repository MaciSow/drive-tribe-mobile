import { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MainText } from '../../MainText';
import { MainButton } from '../../MainButton';
import { DeviceData, SavedDeviceData } from '../../../types';
import { NavigationProps } from '../../../navigation';
import { useBle } from '../../../hooks/useBle';
import { Input } from '../../Input';

interface Props {
  device: DeviceData | undefined;
  closeModal: () => void;
}

export const MoreDeviceData: FC<Props> = ({ device, closeModal }) => {
  const navigation = useNavigation<NavigationProps>();
  const { connectToDevice } = useBle();
  const [inputValue, setInputValue] = useState('');

  const handlePress = async () => {
    if (device) {
      const fullDeviceData: SavedDeviceData = { ...device, characteristicUUID: inputValue };

      await connectToDevice(fullDeviceData).then(() => {
        closeModal();
        navigation.navigate('DeviceDetails', { device: fullDeviceData });
      });
    }
  };

  return (
    <>
      <MainText>Enter device data</MainText>
      <Input
        style={{ marginVertical: 24 }}
        placeholder="DATA_UUID"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <MainButton title="Connect" disabled={!inputValue.length} onPress={handlePress} />
    </>
  );
};
