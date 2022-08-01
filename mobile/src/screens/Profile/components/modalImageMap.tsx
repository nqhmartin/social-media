import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {ScaleH, ScaleW} from '../../../shared/common';

interface data {
  content: string;
  createdAt: string;
  images: string;
  latlng: any;
  location: {
    name: string;
    icon: string;
  };
}
interface Props {
  isVisible: boolean;
  data: data;
  onClose: () => void;
}

const modalImageMap: React.FC<Props> = props => {
  const {isVisible, data, onClose} = props;
  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationOutTiming={500}
      animationInTiming={500}
      swipeDirection={'down'}
      propagateSwipe
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      style={{flex: 1, margin: 0}}
      isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>Photo details</Text>
          <View style={styles.line} />
          <View style={styles.body}>
            <Image
              source={{uri: data?.images}}
              style={styles.images}
              resizeMode="center"
            />
            <View style={styles.location}>
              <Text style={styles.locationName}>
                Location: {data?.location?.name}{' '}
              </Text>
              <Image
                style={styles.locationIcon}
                source={{uri: data?.location?.icon}}
              />
            </View>
            <View>
              <Text>Time upload: {data?.createdAt}</Text>
              <Text>Content: {data?.content}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default modalImageMap;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: 20,
    paddingVertical: ScaleH(10),
    borderTopRightRadius: 20,
    paddingBottom: ScaleH(30),
  },
  modalText: {
    color: '#0C0F14',
    fontSize: ScaleW(16),
    alignSelf: 'center',
    marginBottom: ScaleH(10),
  },
  line: {
    width: '100%',
    height: ScaleH(1),
    backgroundColor: 'gray',
    marginBottom: ScaleH(5),
  },
  body: {
    paddingHorizontal: ScaleW(15),
  },
  images: {
    width: '100%',
    height: 170,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationName: {},
  locationIcon: {
    width: ScaleW(30),
    height: ScaleW(30),
  },
});
