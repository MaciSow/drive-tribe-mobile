export interface DeviceData {
  id: string;
  name: string;
  serviceUUID: string;
}

export interface SavedDeviceData extends DeviceData {
  characteristicUUID: string;
}

export interface ShortParameters {
  mode: DriveMode;
  powerLimit: number;
  isLock: boolean;
}

export enum DriveDirection {
  REAR,
  FRONT,
}

export enum DriveMode {
  SOFT,
  NORMAL,
  RACE,
  DRIFT,
}

export interface DeviceParameters extends ShortParameters {
  driveDirection: DriveDirection;
  leftPower: number;
  rightPower: number;
  leftTemp: number;
  rightTemp: number;
  throttleLvl: number;
  brakeLvl: number;
  nu?: string;
}
