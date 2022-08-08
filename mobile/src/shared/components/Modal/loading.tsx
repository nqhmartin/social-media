import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {ScaleW} from '../../common';
interface Props {
  isVisible: boolean;
}

const loading: React.FC<Props> = props => {
  return (
    <Modal
      style={{flex: 1, margin: 0}}
      backdropOpacity={0.3}
      isVisible={props.isVisible}>
      <View style={styles.modal}>
        <ActivityIndicator color={'white'} size="large" />
      </View>
    </Modal>
  );
};

export default loading;

const styles = StyleSheet.create({
  modal: {
    width: ScaleW(70),
    height: ScaleW(70),
    backgroundColor: '#626262',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
