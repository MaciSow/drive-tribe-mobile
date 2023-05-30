import { FC } from 'react';
import { Pressable, PressableProps, StyleSheet, View } from 'react-native';
import { MainText } from '../MainText';
import { Colors } from '../../constants/colors';

interface Props extends PressableProps {
  title: string;
  outline?: boolean;
}

export const MainButton: FC<Props> = (props) => {
  const { title, outline, disabled } = props;

  const rippleStyle = { color: outline ? Colors.primary500 : Colors.accent800 };

  return (
    <View style={[styles.outerContainer, outline && styles.outline, disabled && styles.disabled]}>
      <Pressable style={styles.innerContainer} android_ripple={rippleStyle} {...props}>
        <MainText style={outline && { color: Colors.accent400 }} dark>
          {title}
        </MainText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    height: 48,
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: Colors.accent400,
  },
  disabled: {
    backgroundColor: Colors.accent800,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.accent400,
  },
});
