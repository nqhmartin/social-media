import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ScaleH, ScaleW} from '../../shared/common';
import Header from './components/header';
import {DATA} from './constant';
import ItemList from './components/itemList';
import {DATAHEADER} from './constant';

interface Props {
  navigation: any;
}

const Home: React.FC<Props> = ({navigation}) => {
  const renderItem = ({item, index}: any) => {
    return <ItemList item={item} index={index} navigation={navigation} />;
  };

  const loadMore = () => {
    return <ActivityIndicator size={'large'} color="red" />;
  };

  const onRefresh = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          data={DATA}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          initialScrollIndex={3}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  body: {
    alignItems: 'flex-end',
    marginLeft: ScaleW(-16),
    flex: 1,
  },
});
