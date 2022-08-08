import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {FONT, ScaleH, ScaleW} from '../../../shared/common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {getAddress} from '../redux/action';
import {API, URL} from '../../../shared/systems';
import Axios from 'axios';
interface Props {
  isVisible: boolean;
  onClose: () => void;
  onChange: (val: string) => void;
  item: any;
}

const modalAddress: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const [data, setData] = useState<string>(props.item);

  useEffect(() => {
    const val = {
      search: '',
    };
    dispatch(getAddress(val));
  }, []);
  const dataAddress = useSelector((state: any) => state.post.postList);

  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={{
          marginVertical: ScaleW(5),
          paddingHorizontal: ScaleW(10),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onPress={() => {
          setData(item.name);
        }}>
        <Text
          style={{
            fontSize: ScaleW(16),
            color: data == item.name ? '#1B65E3' : '#41474D',
          }}>
          {item.name}
        </Text>
        {data === item.name ? (
          <Ionicons
            style={{color: '#1B65E3'}}
            name="checkmark-circle-outline"
            size={22}
          />
        ) : (
          <Ionicons
            style={{color: '#ccc'}}
            name="radio-button-off-outline"
            size={22}
          />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationOutTiming={500}
      animationInTiming={500}
      swipeDirection={'down'}
      propagateSwipe
      onBackButtonPress={props.onClose}
      onSwipeComplete={props.onClose}
      isVisible={props.isVisible}
      style={{flex: 1, margin: 0, justifyContent: 'flex-end'}}>
      <View style={styles.container}>
        <View style={{paddingVertical: ScaleW(16)}}>
          <Text style={styles.modalText}>Choose a address check-in</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.search}>
          <View style={styles.icon}>
            <Ionicons
              style={{color: '#ccc'}}
              name="search-outline"
              size={ScaleW(22)}
            />
          </View>
          <TextInput
            // onChangeText={(txt: string) => onSearch(txt)}
            style={styles.searchInput}
            placeholder={'Search address check-in'}
          />
        </View>
        <View style={{height: ScaleH(300)}}>
          <FlatList
            renderItem={renderItem}
            data={dataAddress}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={[styles.line]}></View>
        <View style={styles.boxBtn}>
          <TouchableOpacity
            onPress={() => {
              setData(props.item);
              props.onClose();
            }}
            style={[
              styles.boxBtn100,
              {borderWidth: 1, borderColor: '#1B65E3'},
            ]}>
            <Text style={{color: '#1B65E3', fontSize: ScaleW(18)}}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.onChange(data);
            }}
            style={[styles.boxBtn100, {backgroundColor: '#1B65E3'}]}>
            <Text style={{color: 'white', fontSize: ScaleW(18)}}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default modalAddress;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalText: {
    alignSelf: 'center',
    fontSize: ScaleW(20),
    fontFamily: FONT.bold,
    color: '#1B65E3',
  },
  line: {
    height: 1,
    width: '95%',
    backgroundColor: '#C0C0C0',
    alignSelf: 'center',
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ScaleW(10),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',
    height: ScaleH(45),
    marginTop: ScaleH(10),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: ScaleH(15),
  },
  searchInput: {
    width: '100%',
  },
  icon: {
    width: ScaleW(25),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginHorizontal: ScaleW(5),
  },
  boxBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: ScaleW(10),
  },
  boxBtn100: {
    height: ScaleW(50),
    width: ScaleW(120),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
