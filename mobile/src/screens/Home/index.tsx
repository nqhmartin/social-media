import * as React from 'react';
import {
  View,
  useWindowDimensions,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {ScaleW} from '../../shared/common';
import {translate} from '../../shared/translate/translate';
import TabExplore from './tabExplore';
import TabFollowing from './tabFollowing';

export default function TabViewExample({navigation}: any) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: translate('home:explore')},
    {key: 'second', title: translate('home:following')},
  ]);

  const renderScene = SceneMap({
    first: () => <TabExplore navigation={navigation} />,
    second: () => <TabFollowing navigation={navigation} />,
  });

  const renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: '#0C0F14'}}
        pressColor={'transparent'}
        style={{
          backgroundColor: 'white',
          width: '60%',
          elevation: 0,
          alignSelf: 'center',
          borderRadius: 10,
        }}
        labelStyle={{
          color: '#0C0F14',
          textTransform: 'capitalize',
        }}></TabBar>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'white'}
        showHideTransition={'slide'}
        barStyle={'dark-content'}
        animated
      />
      <TabView
        lazy={true}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

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
});
