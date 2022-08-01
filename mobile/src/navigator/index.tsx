import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/Login';
import SignUpScreen from '../screens/Auth/SignUp';
import CheckUserScreen from '../screens/Auth/CheckUser';
import BottomTab from './bottomTab';
import DetailItem from '../screens/Home/DetailItem';
import Messenger from '../screens/Messenger';
const configHeader = {
  headerShown: false,
};
const StackAuth = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <StackAuth.Navigator
      initialRouteName="CheckUser"
      screenOptions={configHeader}>
      <StackAuth.Screen name="Login" component={LoginScreen} />
      <StackAuth.Screen name="SignUp" component={SignUpScreen} />
      <StackAuth.Screen name="CheckUser" component={CheckUserScreen} />
    </StackAuth.Navigator>
  );
};

const StackApp = createNativeStackNavigator();

const index = () => {
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName="Auth" screenOptions={configHeader}>
        <StackApp.Screen name="Auth" component={AuthStack} />
        <StackApp.Screen name="Main" component={BottomTab} />
        <StackApp.Screen name="DetailItem" component={DetailItem} />
        <StackApp.Screen name="Messenger" component={Messenger} />
      </StackApp.Navigator>
    </NavigationContainer>
  );
};

export default index;
