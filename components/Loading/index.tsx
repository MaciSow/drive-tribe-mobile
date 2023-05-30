import { StyleSheet, View } from 'react-native';
import { Heading } from '../Heading';
import { Colors } from '../../constants/colors';

export const Loading = () => (
  <View style={styles.container}>
    <Heading text="Loading..." />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});
