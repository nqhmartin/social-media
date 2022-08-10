import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {io} from 'socket.io-client';
import {ScaleH, ScaleW} from '../../shared/common';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import store from '../../core';
type Props = {};

const socket = io('http://192.168.100.130:3000', {
  path: '/message',
});
const Messenger = (props: Props) => {
  const [mess, setMess] = useState<any>([]);
  const [message, setMessage] = useState('');

  const userId = store.getState().rootStore.userInfo._id as any;

  const socketRef = useRef<any>();
  const scrollViewRef = useRef<any>();
  useEffect(() => {
    socketRef.current = socket;
    socketRef.current.on('sendDataServer', (dataGot: any) => {
      setMess((oldMsgs: any) => [...oldMsgs, dataGot.data]);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message !== '') {
      const msg = {
        content: message,
        userId: userId,
      };

      socketRef.current.emit('sendDataClient', msg);

      /*Khi emit('sendDataClient') bên phía server sẽ nhận được sự kiện có tên 'sendDataClient' và handle như câu lệnh trong file index.js
           socket.on("sendDataClient", function(data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
             socketIo.emit("sendDataServer", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
           })
     */
      setMessage('');
    }
  };
  const renderItemChat = () => {
    return mess.map((item: any, index: number) => {
      return (
        <View
          style={userId == item.userId ? styles.itemMe : styles.item}
          key={index}>
          <Text
            style={userId == item.userId ? styles.itemTextMe : styles.itemText}>
            {item.content}
          </Text>
        </View>
      );
    });
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1, height: '100%'}}>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.boxChatMessage}>{renderItemChat()}</View>
        </ScrollView>

        <View style={styles.sendBox}>
          <TextInput
            style={styles.sendBoxInput}
            placeholder="Nhập tin nhắn"
            onChangeText={e => setMessage(e)}
            placeholderTextColor={'#ccc'}
            value={message}
            multiline
            onPressIn={() => {
              scrollViewRef.current.scrollToEnd({animated: true});
            }}
          />
          <TouchableOpacity style={styles.sendBoxSubmit} onPress={sendMessage}>
            <Text style={styles.sendBoxSubmitText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Messenger;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  boxChatMessage: {
    flex: 9,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    backgroundColor: '#F5F6F1',
    padding: ScaleW(15),
    paddingBottom: ScaleW(-15),
  },

  sendBox: {
    flexDirection: 'row',
    height: ScaleH(50),
    justifyContent: 'space-between',
    paddingHorizontal: ScaleW(10),
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5,
  },
  sendBoxInput: {
    flex: 9,
    color: 'black',
  },
  sendBoxSubmit: {
    flex: 1,
  },
  sendBoxSubmitText: {
    color: 'black',
  },
  itemMe: {
    paddingVertical: ScaleH(10),
    paddingHorizontal: ScaleW(20),
    backgroundColor: '#4661EC',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginBottom: ScaleH(10),
  },
  itemTextMe: {
    color: 'white',
  },
  item: {
    paddingVertical: ScaleH(10),
    paddingHorizontal: ScaleW(20),
    backgroundColor: '#ccc',
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginBottom: ScaleH(10),
  },
  itemText: {
    color: '#515354',
  },
});
