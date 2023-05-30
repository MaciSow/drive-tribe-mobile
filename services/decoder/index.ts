import { DeviceParameters } from '../../types';

export const decodeUpdateMessage = (message: string): DeviceParameters | undefined => {
  if (message.slice(0, 1) !== '#' || message.length !== 18) {
    console.log('wrong update message');
    return;
  }

  return {
    isLock: readBooleanValue(message, 1),
    driveDirection: readNumberValue(message, 2),
    mode: readNumberValue(message, 3),
    powerLimit: readHexValue(message, 4),
    leftPower: readHexValue(message, 6),
    rightPower: readHexValue(message, 8),
    leftTemp: readHexValue(message, 10),
    rightTemp: readHexValue(message, 12),
    throttleLvl: readHexValue(message, 14),
    brakeLvl: readHexValue(message, 16),
  };
};

const readBooleanValue = (message: string, index: number): boolean =>
  message.slice(index, index + 1) === '1';

const readNumberValue = (message: string, index: number): number =>
  +message.slice(index, index + 1);

const readHexValue = (message: string, index: number): number =>
  parseInt(message.slice(index, index + 2), 16);
