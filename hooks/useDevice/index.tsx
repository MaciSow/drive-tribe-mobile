import { useAppDispatch, useAppSelector } from '../store';
import { useBle } from '../useBle';
import { DeviceParameters, DriveMode, ShortParameters } from '../../types';
import { setParameters } from '../../slices/deviceSlice';

interface Parameters {
  mode?: DriveMode;
  powerLimit?: number;
  isLock?: boolean;
}

interface UseDeviceReturn {
  sendNewParameters: (params: Parameters) => void;
  readAllParameters: () => Promise<void>;
}

export const useDevice = (): UseDeviceReturn => {
  const dispatch = useAppDispatch();
  const { deviceParameters, connectedDevice } = useAppSelector((state) => state.device);
  const { sendValue, readValue } = useBle();

  const sendNewParameters = async (params: Parameters) => {
    if (!deviceParameters) {
      return;
    }

    const { mode, isLock, powerLimit } = deviceParameters;

    const currentParameters: ShortParameters = {
      mode,
      isLock,
      powerLimit,
    };

    const preparedParams = { ...currentParameters, ...params };

    const stringValue: string = JSON.stringify(preparedParams);

    await sendValue(stringValue);
    console.log(stringValue, stringValue.length);
  };

  const readAllParameters = async () => {
    const response = await readValue();

    if (response) {
      try {
        const parameters: DeviceParameters = JSON.parse(response);
        dispatch(setParameters(parameters));
      } catch (e) {
        console.log(e);
      }
    }
  };

  return { sendNewParameters, readAllParameters };
};
