import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ExploreScreen from '../screens/Explore';
import PostScreen from '../screens/Post';
import SearchScreen from '../screens/Search';
import ProfileScreen from '../screens/Profile';
import HomeScreen from '../screens/Home';
import {Image, StyleSheet} from 'react-native';
import {ScaleH, ScaleW} from '../shared/common';
import MessengerScreen from '../screens/Messenger';
type Props = {};

const StackBottom = createBottomTabNavigator();
const BottomTab = (props: Props) => {
  return (
    <StackBottom.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarStyle: {
          height: ScaleH(50),
          paddingTop: ScaleH(10),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        headerShown: false,
        tabBarLabel: '',
        tabBarIcon: ({focused, color}) => {
          if (route.name == 'Home') {
            return (
              <Image
                resizeMode="contain"
                source={require('../assets/icons/home.png')}
                style={[
                  styles.icon,
                  {tintColor: focused ? '#0F44CC' : '#2D323E'},
                ]}
              />
            );
          }
          if (route.name == 'Messenger') {
            return (
              <Image
                resizeMode="contain"
                source={require('../assets/icons/messenger.png')}
                style={[
                  styles.icon,
                  {tintColor: focused ? '#0F44CC' : '#2D323E'},
                ]}
              />
            );
          }

          if (route.name == 'Post') {
            return (
              <Image
                resizeMode="contain"
                source={require('../assets/icons/more.png')}
                style={[
                  styles.icon,
                  {tintColor: focused ? '#0F44CC' : '#2D323E'},
                ]}
              />
            );
          }
          if (route.name == 'Search') {
            return (
              <Image
                resizeMode="contain"
                source={require('../assets/icons/search.png')}
                style={[
                  styles.icon,
                  {tintColor: focused ? '#0F44CC' : '#2D323E'},
                ]}
              />
            );
          }
          if (route.name == 'Profile') {
            return (
              <Image
                resizeMode="contain"
                source={require('../assets/icons/user.png')}
                style={[
                  styles.icon,
                  {tintColor: focused ? '#0F44CC' : '#2D323E'},
                ]}
              />
            );
          }
        },
      })}>
      <StackBottom.Screen name="Home" component={HomeScreen} />
      <StackBottom.Screen name="Search" component={SearchScreen} />

      <StackBottom.Screen name="Post" component={PostScreen} />
      <StackBottom.Screen name="Messenger" component={MessengerScreen} />

      <StackBottom.Screen name="Profile" component={ProfileScreen} />
    </StackBottom.Navigator>
  );
};

export default BottomTab;
const styles = StyleSheet.create({
  icon: {
    height: ScaleH(25),
    width: ScaleW(25),
  },
});
