import { Modal, StyleSheet, View } from 'react-native';
import { FC, ReactNode } from 'react';
import { Colors } from '../../constants/colors';

interface Props {
  visible: boolean;
  closeModal: () => void;
  children: ReactNode;
}

export const CustomModal: FC<Props> = ({ visible, closeModal, children }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSemiTransparent,
  },
  modalView: {
    width: '80%',
    backgroundColor: Colors.primary700,
    borderRadius: 4,
    padding: 24,
    alignItems: 'center',
  },
});
