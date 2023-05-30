import { FC } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MainText } from '../../../../components/MainText';
import { Colors } from '../../../../constants/colors';

interface Props {
  name: string;
  handlePress: () => void;
  isFocus?: boolean;
}

export const ModeItem: FC<Props> = ({ name, handlePress, isFocus }) => (
  <View style={[styles.outerContainer, isFocus && styles.focus]}>
    <Pressable
      style={styles.innerContainer}
      android_ripple={{ color: Colors.primary500 }}
      onPress={handlePress}
    >
      <MainText bold={isFocus}>{name}</MainText>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    padding: 16,
  },
});
