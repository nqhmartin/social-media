import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {io} from 'socket.io-client';
type Props = {};

const socket = io('http://192.168.100.130:3000');
const Messenger = (props: Props) => {
  const [mess, setMess] = useState<any>([]);
  console.log('🚀 ~ file: index.tsx ~ line 15 ~ Messenger ~ mess', mess);
  const [message, setMessage] = useState('');
  const [id, setId] = useState();

  const socketRef = useRef<any>();

  useEffect(() => {
    socketRef.current = socket;
    socketRef.current.on('getId', data => {
      setId(data);
    });

    socketRef.current.on('sendDataServer', (dataGot: any) => {
      setMess((oldMsgs: any) => [...oldMsgs, dataGot.data]);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message !== null) {
      const msg = {
        content: message,
        id: id,
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
  return (
    <View>
      <View style={styles.boxChatMessage}>
        {mess.map((item, index) => {
          return (
            <View>
              <Text>{item.content}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.sendBox}>
        <TextInput
          placeholder="Nhập tin nhắn"
          onChangeText={e => setMessage(e)}
          value={message}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Messenger;

const styles = StyleSheet.create({});
