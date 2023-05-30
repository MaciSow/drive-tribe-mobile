import { FC, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { Colors } from '../../constants/colors';
import { BasicFontStyle } from '../../constants/fonts';

export const Input: FC<TextInputProps> = (props) => {
  const [isFocus, setFocus] = useState(false);
  const { style, ...rest } = props;

  return (
    <TextInput
      style={[styles.input, isFocus && styles.focus, style]}
      placeholderTextColor={isFocus ? Colors.primary500 : Colors.textLight}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 48,
    width: '100%',
    backgroundColor: Colors.primary500,
    borderRadius: 4,
    paddingHorizontal: 16,
    ...BasicFontStyle,
  },
  focus: {
    backgroundColor: Colors.primary700,
    borderWidth: 2,
    borderColor: Colors.accent400,
  },
});
