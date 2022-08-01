import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {changeLanguage} from '../../shared/translate/translate';
import store from '../../core';
type Props = {};

const CheckUSer: React.FC<Props> = ({navigation}: any) => {
  const checkUser = () => {
    if (true) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('Login');
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
