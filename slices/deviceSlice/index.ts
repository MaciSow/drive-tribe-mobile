import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeviceParameters, SavedDeviceData } from '../../types';

interface DeviceState {
  connectedDevice?: SavedDeviceData;
  deviceParameters?: DeviceParameters;
  savedDevices: SavedDeviceData[];
}

const initialState: DeviceState = {
  savedDevices: [],
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setConnectedDevice: (state, { payload }: PayloadAction<SavedDeviceData>) => {
      state.connectedDevice = payload;
    },
    disconnectDevice: (state) => {
      state.connectedDevice = undefined;
      state.deviceParameters = undefined;
    },
    addDevice: (state, { payload }: PayloadAction<SavedDeviceData>) => {
      if (state.savedDevices.find((item) => item.id === payload.id)) {
        return;
      }
      state.savedDevices.push(payload);
    },
    removeDevice: (state, { payload }: PayloadAction<string>) => {
      state.savedDevices = state.savedDevices.filter((item) => item.id !== payload);
    },
    setParameters: (state, { payload }: PayloadAction<DeviceParameters>) => {
      state.deviceParameters = payload;
    },
  },
});

export const { setConnectedDevice, disconnectDevice, addDevice, removeDevice, setParameters } =
  deviceSlice.actions;

export default deviceSlice.reducer;
