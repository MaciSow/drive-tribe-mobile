import { StyleSheet } from 'react-native';
import { FC } from 'react';
import { MainText } from '../MainText';
import { Colors } from '../../constants/colors';

interface Props {
  text: string;
}

export const Heading: FC<Props> = ({ text }) => (
  <MainText size="lg" bold style={styles.heading}>
    {text}
  </MainText>
);

const styles = StyleSheet.create({
  heading: {
    color: Colors.accent400,
  },
});
