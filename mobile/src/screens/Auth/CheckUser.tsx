import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {changeLanguage} from '../../shared/translate/translate';
import store from '../../core';
type Props = {};

const CheckUSer: React.FC<Props> = ({navigation}: any) => {
  const checkUser = () => {
    const check = store.getState().rootStore.userInfo as any;
    if (!check.username) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('Main');
    }
  };
  useEffect(() => {
    checkUser();
    changeLanguage(store.getState().rootStore.language);
  }, []);
  return (
    <View>
      <Text>CheckUSer</Text>
    </View>
  );
};

export default CheckUSer;

const styles = StyleSheet.create({});
