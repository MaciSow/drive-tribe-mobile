import { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBle } from '../../hooks/useBle';
import { Colors } from '../../constants/colors';
import { DeviceData } from '../../types';
import { ListItem } from '../DeviceList/ListItem';
import { useAppSelector } from '../../hooks/store';
import { NavigationProps } from '../../navigation';
import { CustomModal } from '../../components/Modals';
import { MoreDeviceData } from '../../components/Modals/MoreDeviceData';

export const SearchDevice = () => {
  const navigation = useNavigation<NavigationProps>();
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
    setSelectedDevice(undefined);
  };
  const [selectedDevice, setSelectedDevice] = useState<DeviceData>();
  const { connectedDevice, savedDevices } = useAppSelector((state) => state.device);

  const { getDevicesData, handleScan, stopScan, connectToDevice } = useBle();

  const handlePress = async (device: DeviceData) => {
    if (device.id === connectedDevice?.id) {
      navigation.navigate('DeviceDetails', { device: connectedDevice });
      return;
    }

    const savedDevice = savedDevices.find(({ id }) => id === device.id);
    if (savedDevice) {
      await connectToDevice(savedDevice).then(() => {
        closeModal();
        navigation.navigate('DeviceDetails', { device: savedDevice });
      });

      return;
    }

    setSelectedDevice(device);
    setModalVisible(true);
  };

  const renderListItem = useCallback(
    ({ item }: ListRenderItemInfo<DeviceData>) => {
      return (
        <ListItem
          handlePress={() => handlePress(item)}
          device={item}
          isFocus={item.id === connectedDevice?.id}
        />
      );
    },
    [connectedDevice],
  );

  useEffect(() => {
    handleScan();

    return () => {
      stopScan();
    };
  }, []);

  const getModal = () => (
    <CustomModal visible={modalVisible} closeModal={closeModal}>
      <MoreDeviceData device={selectedDevice} closeModal={closeModal} />
    </CustomModal>
  );

  return (
    <View style={styles.outerContainer}>
      {getModal()}
      <FlatList
        data={getDevicesData()}
        keyExtractor={(item) => item.id}
        renderItem={renderListItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.accent400,
  },
  outerContainer: {
    flex: 1,
    padding: 24,
  },
});
