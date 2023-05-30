import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Stack } from './navigation';
import { DeviceList } from './screens/DeviceList';
import { Colors } from './constants/colors';
import { DeviceNavigator } from './screens/DeviceNavigator';
import { SearchDevice } from './screens/SearchDevice';
import { store } from './config/store';
import { DisconnectIcon } from './screens/DeviceNavigator/DisconnectIcon';
import { Loading } from './components/Loading';

const App = () => {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: Colors.textLight,
            headerStyle: { backgroundColor: Colors.primary700 },
            contentStyle: { backgroundColor: Colors.background },
          }}
        >
          <Stack.Screen
            name="DeviceList"
            component={DeviceList}
            options={{ title: 'Device List' }}
          />
          <Stack.Screen
            name="SearchDevice"
            component={SearchDevice}
            options={{ title: 'Search Device' }}
          />
          <Stack.Screen
            name="DeviceDetails"
            component={DeviceNavigator}
            options={{ headerRight: () => <DisconnectIcon /> }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
