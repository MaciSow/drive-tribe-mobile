import { Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../../../constants/colors';
import { useBle } from '../../../hooks/useBle';

export const DisconnectIcon = () => {
  const { disconnectFromDevice } = useBle();
  const handlePress = () => {
    disconnectFromDevice();
  };

  return (
    <Pressable
      style={styles.iconWrapper}
      android_ripple={{ color: Colors.primary500, radius: 24 }}
      onPress={handlePress}
    >
      <AntDesign name="disconnect" size={24} color={Colors.textLight} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    padding: 16,
  },
});
