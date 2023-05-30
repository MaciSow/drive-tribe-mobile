import { useState } from 'react';
import { BleManager, Device } from 'react-native-ble-plx';
import { PermissionsAndroid } from 'react-native';
import base64 from 'react-native-base64';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { DeviceData, DeviceParameters, SavedDeviceData } from '../../types';
import { useAppDispatch, useAppSelector } from '../store';
import {
  addDevice,
  disconnectDevice,
  setConnectedDevice,
  setParameters,
} from '../../slices/deviceSlice';
import { decodeUpdateMessage } from '../../services/decoder';

interface UseBleReturn {
  handleScan: () => Promise<void>;
  stopScan: () => void;
  logDevicesName: () => void;
  getDevices: () => Device[];
  getDevicesData: () => DeviceData[];
  connectToDevice: (deviceToConnect: SavedDeviceData) => Promise<void>;
  disconnectFromDevice: () => void;
  getDeviceDataAfterCheck: () => Promise<DeviceData | undefined>;
  getDevice: (deviceId: string) => Device | undefined;
  sendValue: (value: string) => Promise<void>;
  readValue: () => Promise<string | void>;
  lookingForDevice: (deviceId: string, callback: () => void) => Promise<void>;
}

const bleManager = new BleManager();

export const useBle = (): UseBleReturn => {
  const dispatch = useAppDispatch();
  const { connectedDevice } = useAppSelector((state) => state.device);
  const [allDevices, setAllDevices] = useState<Device[]>([]);

  const requestPermission = async () => {
    try {
      if (false) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'DriveTribe permission',
            message: 'DriveTribe need permission to location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use bluetooth');
        } else {
          console.log('Bluetooth permission denied');
        }
      } else {
        const result = await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]);

        const isGranted =
          result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const lookingForDevice = async (deviceId: string, callback: () => void) => {
    try {
      await requestPermission();
      bleManager.startDeviceScan(null, null, (err, device) => {
        if (err) {
          console.log(err);
        }
        if (device && device.id === deviceId) {
          bleManager.stopDeviceScan();
          callback();
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const startScan = () => {
    bleManager.startDeviceScan(null, null, (err, device) => {
      if (err) {
        console.log(err);
      }
      if (device) {
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicateDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });
  };

  const handleScan = async () => {
    try {
      await requestPermission();
      startScan();
    } catch (e) {
      console.log(e);
    }
  };

  const stopScan = () => bleManager.stopDeviceScan();

  //DEVICE

  const getDeviceDataAfterCheck = async (): Promise<SavedDeviceData | undefined> => {
    if (!connectedDevice) {
      dispatch(disconnectDevice());
      return undefined;
    }

    const isConnected = await bleManager.isDeviceConnected(connectedDevice.id);
    if (!isConnected) {
      dispatch(disconnectDevice());
      return undefined;
    }

    return connectedDevice;
  };

  const connectToDevice = async (deviceToConnect: SavedDeviceData) => {
    try {
      if (connectedDevice) {
        await disconnectFromDevice();
      }

      const deviceConnection = await bleManager.connectToDevice(deviceToConnect.id);
      deviceConnection
        .discoverAllServicesAndCharacteristics()
        .then(async (connectDevice) => {
          bleManager.onDeviceDisconnected(connectDevice.id, (error, device) => {
            dispatch(disconnectDevice());
          });
          dispatch(setConnectedDevice(deviceToConnect));
          dispatch(addDevice(deviceToConnect));

          const { serviceUUID, characteristicUUID } = deviceToConnect;

          const readResponse = await connectDevice.readCharacteristicForService(
            serviceUUID,
            characteristicUUID,
          );

          let notifyUUID = '';
          if (readResponse) {
            const response = base64.decode(readResponse?.value ?? '');
            try {
              const parameters: DeviceParameters = JSON.parse(response);
              notifyUUID = parameters.nu ?? '';
              dispatch(setParameters(parameters));
            } catch (e) {
              console.log(e);
            }
          }

          connectDevice.monitorCharacteristicForService(
            serviceUUID,
            notifyUUID,
            (error, characteristic) => {
              if (characteristic?.value != null) {
                readNotify(base64.decode(characteristic.value));
              }
            },
            'dataUpdate',
          );
        })
        .catch((err) => console.log(err));
      bleManager.stopDeviceScan();
    } catch (e) {
      console.log('FAILED TO CONNECT', e);
    }
  };

  const disconnectFromDevice = async () => {
    const checkedDevice = await getDeviceDataAfterCheck();

    if (!checkedDevice) {
      console.log('Nothing is connected');
      return;
    }

    await bleManager.cancelDeviceConnection(checkedDevice.id);
    dispatch(disconnectDevice());
  };

  const readNotify = (value: string) => {
    const result = decodeUpdateMessage(value);

    if (!result) {
      return;
    }

    dispatch(setParameters(result));
  };

  const sendValue = async (value: string) => {
    const checkedDevice = await getDeviceDataAfterCheck();

    if (!checkedDevice) {
      console.log('Nothing is connected');
      return;
    }

    const characteristic = await bleManager.writeCharacteristicWithResponseForDevice(
      checkedDevice.id,
      checkedDevice.serviceUUID,
      checkedDevice.characteristicUUID,
      base64.encode(value.toString()),
    );
  };

  const readValue = async () => {
    const checkedDevice = await getDeviceDataAfterCheck();

    if (!checkedDevice) {
      console.log('Nothing is connected');
      return;
    }

    try {
      const characteristic = await bleManager.readCharacteristicForDevice(
        checkedDevice.id,
        checkedDevice.serviceUUID,
        checkedDevice.characteristicUUID,
      );

      const { value } = characteristic;
      if (value) {
        return base64.decode(value);
      }
      return;
    } catch (e) {
      console.log(e);
    }
  };

  //RETURN DEVICES

  const logDevicesName = () => console.log(allDevices);

  const getDeviceData = (device: Device): DeviceData => {
    const { id, name, serviceUUIDs } = device;

    return {
      id: id,
      name: name ?? 'N/A',
      serviceUUID: serviceUUIDs ? serviceUUIDs[0] : '',
    };
  };

  const getDevicesData = (): DeviceData[] => allDevices.map(getDeviceData);

  const getDevices = () => allDevices;

  const getDevice = (deviceId: string) => allDevices.find((item) => item.id === deviceId);

  return {
    handleScan,
    stopScan,
    logDevicesName,
    getDevices,
    connectToDevice,
    disconnectFromDevice,
    getDevicesData,
    getDevice,
    sendValue,
    readValue,
    getDeviceDataAfterCheck,
    lookingForDevice,
  };
};
