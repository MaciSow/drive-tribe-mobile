import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ParameterBox } from '../Parameters/ParameterBox';
import { useAppSelector } from '../../../hooks/store';
import { MainButton } from '../../../components/MainButton';
import { Input } from '../../../components/Input';
import { useDevice } from '../../../hooks/useDevice';
import { MainText } from '../../../components/MainText';
import { Loading } from '../../../components/Loading';

export const Limit = () => {
  const { sendNewParameters } = useDevice();
  const { deviceParameters } = useAppSelector((state) => state.device);
  if (!deviceParameters) {
    return <Loading />;
  }

  useEffect(() => {
    if (deviceParameters) {
      setNewLimit(deviceParameters.powerLimit);
    }
  }, [deviceParameters && deviceParameters.powerLimit]);

  const { powerLimit } = deviceParameters;

  const [newLimit, setNewLimit] = useState<number>(powerLimit);

  const handleChange = (text: string) => {
    const numberValue = Number(text);

    if (numberValue > 100) {
      setNewLimit(100);
      return;
    }

    if (numberValue < 0) {
      setNewLimit(0);
      return;
    }

    setNewLimit(numberValue);
  };

  const changeLimit = (up = true) => {
    setNewLimit((prevState) => prevState + (up ? 1 : -1));
  };

  const handleSetLimit = () => {
    sendNewParameters({ powerLimit: newLimit });
  };

  return (
    <View style={styles.container}>
      <ParameterBox value={`${powerLimit} %`} name="Current Power Limit" />
      <View style={styles.textContainer}>
        <MainText>Set new power limit [%]</MainText>
      </View>
      <View style={styles.setterContainer}>
        <MainButton
          onLongPress={() => setNewLimit(100)}
          disabled={newLimit === 100}
          onPress={() => changeLimit()}
          title="+"
        />
        <Input
          maxLength={3}
          keyboardType="number-pad"
          style={styles.inputStyle}
          value={newLimit.toString()}
          onChangeText={handleChange}
        />
        <MainButton
          onLongPress={() => setNewLimit(0)}
          onPress={() => changeLimit(false)}
          disabled={!newLimit}
          title="-"
        />
      </View>
      <MainButton onPress={handleSetLimit} disabled={powerLimit === newLimit} title="SET LIMIT" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  setterContainer: {
    flex: 3,
  },
  inputStyle: {
    textAlign: 'center',
    marginVertical: 24,
  },
  textContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
});
