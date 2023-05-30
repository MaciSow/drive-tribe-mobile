import { useState } from 'react';
import { View, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { ListItem } from './ListItem';
import { SavedDeviceData } from '../../types';
import { MainButton } from '../../components/MainButton';
import { NavigationProps } from '../../navigation';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { CustomModal } from '../../components/Modals';
import { ConnectDevice } from '../../components/Modals/ConnectDevice';
import { removeDevice } from '../../slices/deviceSlice';

export const DeviceList = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();
  const { savedDevices, connectedDevice } = useAppSelector((state) => state.device);
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
    setSelectedDevice(undefined);
  };
  const [selectedDevice, setSelectedDevice] = useState<SavedDeviceData>();

  const handlePress = (device: SavedDeviceData) => {
    if (device.id === connectedDevice?.id) {
      navigation.navigate('DeviceDetails', { device: connectedDevice });
      return;
    }

    setSelectedDevice(device);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    dispatch(removeDevice(id));
  };

  const renderListItem = ({ item }: ListRenderItemInfo<SavedDeviceData>) => {
    const isFocus = item.id == connectedDevice?.id;
    return (
      <ListItem
        handlePress={() => handlePress(item)}
        device={item}
        isFocus={isFocus}
        handleDelete={!isFocus ? () => handleDelete(item.id) : undefined}
      />
    );
  };

  const handleSearch = () => navigation.navigate('SearchDevice');

  const getModal = () => (
    <CustomModal visible={modalVisible} closeModal={closeModal}>
      <ConnectDevice device={selectedDevice} closeModal={closeModal} />
    </CustomModal>
  );

  return (
    <View style={styles.outerContainer}>
      {getModal()}
      <FlatList data={savedDevices} keyExtractor={(item) => item.id} renderItem={renderListItem} />
      <MainButton title="Search New" onPress={handleSearch} />
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
