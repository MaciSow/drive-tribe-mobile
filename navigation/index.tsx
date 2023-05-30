import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DeviceDetailsProps } from '../screens/DeviceNavigator/Details';

export const Stack = createNativeStackNavigator<StackParamList>();

export type StackParamList = {
  DeviceList: undefined;
  DeviceDetails: DeviceDetailsProps;
  SearchDevice: undefined;
};

export type NavigationProps = NativeStackNavigationProp<StackParamList>;

export const BottomTab = createBottomTabNavigator();

export type BottomTabParamList = {
  Details: DeviceDetailsProps;
};

export type BottomTabProps = BottomTabNavigationProp<BottomTabParamList>;
