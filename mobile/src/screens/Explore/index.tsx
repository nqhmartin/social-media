import * as React from 'react';
import {View, useWindowDimensions, StyleSheet, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {ScaleH, ScaleW} from '../../shared/common';
import TabExplore from './tabExplore';
import TabResearch from './tabResearch';

const renderScene = SceneMap({
  '0': () => <TabExplore />,
  '1': () => <TabResearch />,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '0', title: 'Explore'},
    {key: '1', title: 'Research'},
  ]);

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
      <TabView
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
});
