import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {FONT, ScaleH, ScaleW} from '../../../shared/common';
import {changeLanguage, translate} from '../../../shared/translate/translate';
import {chooseLanguage} from '../../../core/root/action';
import {useDispatch} from 'react-redux';
import {LANGUAGE} from '../constants';
import store from '../../../core';
interface Props {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  onChange: (e: string) => void;
}

const modalChooseLanguage: React.FC<Props> = props => {
  const [dataLanguage, setdataLanguage] = useState(
    store.getState().rootStore.language,
  );
  const {isVisible, onClose, title, onChange} = props;

  const dispatch = useDispatch();

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
      isVisible={isVisible}
      style={{flex: 1, margin: 0}}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View>
            <Text style={styles.modalText}>{title}</Text>
            <View style={styles.line} />
          </View>
          <View>
            {LANGUAGE.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.item}
                  onPress={() => {
                    dispatch(chooseLanguage(item.value));
                    setdataLanguage(item.value);
                    changeLanguage(item.value);
                    onChange(item.label);
                    onClose();
                  }}>
                  <Text
                    style={[
                      styles.itemText,
                      {
                        color:
                          dataLanguage === item.value ? '#1B65E3' : '#41474D',
                      },
                    ]}>
                    {translate(item.label)}
                  </Text>
                  {dataLanguage == item.value ? (
                    <Image
                      source={require('../../../assets/icons/check-mark.png')}
                      style={[styles.itemIcon, {tintColor: '#1B65E3'}]}
                    />
                  ) : (
                    <Image
                      source={require('../../../assets/icons/dry-clean.png')}
                      style={[styles.itemIcon, {tintColor: '#41474D'}]}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default modalChooseLanguage;

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
    alignSelf: 'center',
    paddingBottom: ScaleW(10),
    fontSize: ScaleW(20),
    fontFamily: FONT.bold,
    color: '#1B65E3',
  },
  line: {
    width: '100%',
    height: ScaleH(2),
    borderColor: '#ccc',
    borderWidth: 0.7,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ScaleW(10),
  },
  itemText: {
    fontSize: ScaleW(16),
  },
  itemIcon: {
    width: ScaleW(22),
    height: ScaleW(22),
  },
});
