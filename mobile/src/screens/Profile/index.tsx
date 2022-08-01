import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DATAPROFILE, DATAIMAGES} from './constants';
import Header from './components/header';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {ScaleH, ScaleW} from '../../shared/common';
import TabImage from './tabImage';
import TabList from './tabList';
import TabMap from './tabMap';

interface Props {}

const getTabBarIcon = (props: any) => {
  const {route, focused} = props;

  if (route.key === '0') {
    const active = focused ? '#0F44CC' : '#7C8089';

    return (
      <Image
        style={[styles.tabIcon, {tintColor: active}]}
        source={require('../../assets/icons/menu.png')}
      />
    );
  }
  if (route.key === '1') {
    const active = focused ? '#0F44CC' : '#7C8089';
    return (
      <Image
        style={[styles.tabIcon, {tintColor: active}]}
        source={require('../../assets/icons/list.png')}
      />
    );
  }
  if (route.key === '2') {
    const active = focused ? '#0F44CC' : '#7C8089';

    return (
      <Image
        style={[styles.tabIcon, {tintColor: active}]}
        source={require('../../assets/icons/map.png')}
      />
    );
  }
};
const Profile: React.FC<Props> = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [showHeader, setshowHeader] = useState(true);

  useEffect(() => {
    if (index === 0) {
      setshowHeader(true);
    }
    if (index === 1) {
      setshowHeader(true);
    }
    if (index === 2) {
      setshowHeader(false);
    }
  }, [index]);

  const [routes] = React.useState([
    {key: '0', title: ''},
    {key: '1', title: ''},
    {key: '2', title: ''},
  ]);
  const renderScene = SceneMap({
    '0': () => <TabImage data={DATAIMAGES} />,
    '1': () => <TabList />,
    '2': () => <TabMap />,
  });
  return (
    <View style={styles.container}>
      {showHeader && <Header data={DATAPROFILE} />}
      <View style={{flex: 1, marginTop: ScaleH(20)}}>
        <TabView
          lazy={true}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          tabBarPosition="top"
          renderTabBar={props => {
            return (
              <TabBar
                {...props}
                renderIcon={props => getTabBarIcon(props)}
                tabStyle={styles.bubble}
                labelStyle={styles.noLabel}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  noLabel: {
    display: 'none',
    height: 0,
  },
  bubble: {
    backgroundColor: 'white',
    // height: ScaleH(50),
  },
  tabIcon: {
    height: ScaleW(25),
    width: ScaleW(25),
  },
});
