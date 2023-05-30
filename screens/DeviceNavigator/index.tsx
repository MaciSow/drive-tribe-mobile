import { useEffect, useLayoutEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BottomTab, NavigationProps, StackParamList } from '../../navigation';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { Parameters } from './Parameters';
import { Modes } from './Modes';
import { Limit } from './Limit';
import { Lock } from './Lock';
import { useAppSelector } from '../../hooks/store';

type DeviceDetailsRouteProp = RouteProp<StackParamList, 'DeviceDetails'>;

export const DeviceNavigator = () => {
  const { connectedDevice } = useAppSelector((state) => state.device);

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<DeviceDetailsRouteProp>();
  const { device } = route.params;
  const { id, name } = device;

  useLayoutEffect(() => {
    navigation.setOptions({ title: name });
  }, [name]);

  useEffect(() => {
    if (!connectedDevice || connectedDevice.id !== id) {
      navigation.goBack();
    }
  }, [connectedDevice]);

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.primary700,
        },
        tabBarActiveTintColor: Colors.accent400,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarLabelStyle: { fontFamily: Fonts.regular, fontSize: Fonts.sizeSm },
      }}
      sceneContainerStyle={{ backgroundColor: Colors.background, padding: 24 }}
    >
      <BottomTab.Screen
        name="Parameters"
        component={Parameters}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="speed" size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Modes"
        component={Modes}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="sliders" size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Limit"
        component={Limit}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="fraction-one-half" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Lock"
        component={Lock}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="lock-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
