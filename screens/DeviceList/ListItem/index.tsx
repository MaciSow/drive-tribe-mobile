import { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MainText } from '../../../components/MainText';
import { Colors } from '../../../constants/colors';
import { DeviceData } from '../../../types';

interface Props {
  device: DeviceData;
  handlePress: () => void;
  handleDelete?: () => void;
  isFocus?: boolean;
}

export const ListItem: FC<Props> = ({ device, handlePress, handleDelete, isFocus }) => (
  <View style={[styles.outerContainer, isFocus && styles.focus]}>
    <Pressable
      style={styles.innerContainer}
      android_ripple={{ color: Colors.primary500 }}
      onPress={handlePress}
    >
      <MainText bold={isFocus}>{device.name}</MainText>
      {handleDelete && (
        <Pressable
          style={styles.iconWrapper}
          android_ripple={{ color: Colors.primary500, radius: 24 }}
          onLongPress={handleDelete}
        >
          <MaterialCommunityIcons name="delete-outline" size={24} color={Colors.textLight} />
        </Pressable>
      )}
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  outerContainer: {
    overflow: 'hidden',
    backgroundColor: Colors.primary700,
    borderRadius: 4,
    height: 64,
    width: '100%',
    marginBottom: 16,
  },
  focus: {
    backgroundColor: Colors.accent800,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
  },
  iconWrapper: {
    padding: 16,
  },
});
