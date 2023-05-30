import { Text, StyleSheet } from 'react-native';
import { FC } from 'react';
import { TextProps } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

interface Props extends TextProps {
  size?: 'sm' | 'md' | 'lg';
  bold?: boolean;
  dark?: boolean;
}

export const MainText: FC<Props> = ({ children, dark, size, bold, style }) => {
  const getSize = () => {
    switch (size) {
      case 'sm':
        return 12;
      case 'lg':
        return 24;
      default:
        return 18;
    }
  };

  const styles = StyleSheet.create({
    text: {
      fontFamily: bold ? Fonts.bold : Fonts.regular,
      fontSize: getSize(),
      color: dark ? Colors.textDark : Colors.textLight,
    },
  });

  return <Text style={[styles.text, style]}>{children}</Text>;
};
