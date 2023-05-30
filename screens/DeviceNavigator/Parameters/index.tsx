import { StyleSheet, View } from 'react-native';
import { MainText } from '../../../components/MainText';
import { useAppSelector } from '../../../hooks/store';
import { ParameterBox } from './ParameterBox';
import { Colors } from '../../../constants/colors';
import { Loading } from '../../../components/Loading';

const Spacer = () => <View style={styles.spacer} />;

export const Parameters = () => {
  const { deviceParameters } = useAppSelector((state) => state.device);
  if (!deviceParameters) {
    return <Loading />;
  }

  const { throttleLvl, brakeLvl, leftPower, rightPower, leftTemp, rightTemp } = deviceParameters;
  return (
    <View style={styles.container}>
      <View style={styles.stack}>
        <ParameterBox value={`${brakeLvl} %`} name="Brake" />
        <Spacer />
        <ParameterBox value={`${throttleLvl} %`} name="Throttle" />
      </View>
      <Spacer />
      <View style={styles.textStack}>
        <View style={styles.textContainer}>
          <MainText>Left</MainText>
        </View>
        <Spacer />
        <View style={styles.textContainer}>
          <MainText>Right</MainText>
        </View>
      </View>
      <View style={styles.stack}>
        <ParameterBox value={`${leftPower} %`} name="Power" />
        <Spacer />
        <ParameterBox value={`${rightPower} %`} name="Power" />
      </View>
      <Spacer />
      <View style={styles.stack}>
        <ParameterBox isHot={leftTemp > 50} value={`${leftTemp} °C`} name="Temperature" />
        <Spacer />
        <ParameterBox isHot={rightTemp > 50} value={`${rightTemp} °C`} name="Temperature" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stack: {
    flex: 1,
    flexDirection: 'row',
  },
  textStack: {
    width: '100%',
    flexDirection: 'row',
    borderTopColor: Colors.accent400,
    borderTopWidth: 2,
  },
  spacer: {
    height: 24,
    width: 24,
  },
  textContainer: {
    flex: 1,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
