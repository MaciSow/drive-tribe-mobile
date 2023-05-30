import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../../../constants/colors';
import { MainText } from '../../../../components/MainText';

interface Props {
  name: string;
  value: string;
  isHot?: boolean;
}

export const ParameterBox: FC<Props> = ({ name, value, isHot }) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <MainText>{name}</MainText>
      </View>
      <View style={[styles.valueContainer, isHot && styles.hotBackground]}>
        <MainText size="lg" bold>
          {value}
        </MainText>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary700,
    borderRadius: 4,
    overflow: 'hidden',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotBackground: {
    backgroundColor: Colors.warning,
  },
});
