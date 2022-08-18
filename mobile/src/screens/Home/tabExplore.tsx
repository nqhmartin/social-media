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
import React, {useEffect, useState} from 'react';
import {ScaleH, ScaleW} from '../../shared/common';
import Header from './components/header';
import {DATA} from './constant';
import ItemList from './components/itemList';
import {DATAHEADER} from './constant';
import {useDispatch, useSelector} from 'react-redux';
import {getPostExplore} from './redux/action';
import {RootState} from '../../core';
interface Props {
  navigation: any;
}

const Home: React.FC<Props> = ({navigation}) => {
  const page = useSelector((state: RootState) => state.home.page);
  const refreshing = useSelector((state: RootState) => state.home.refreshing);
  const exploreList = useSelector((state: RootState) => state.home.exploreList);
  const dispatch = useDispatch();

  useEffect(() => {
    const val = {
      page: 1,
    };
    dispatch(getPostExplore(val));
  }, []);

  const renderItem = ({item, index}: any) => {
    return <ItemList item={item} index={index} navigation={navigation} />;
  };

  const loadMore = () => {
    const val = {
      page: page + 1,
      isMore: true,
    };
    dispatch(getPostExplore(val));
  };

  const onRefresh = () => {
    if (!refreshing) {
      const val = {
        page: 1,
      };
      dispatch(getPostExplore(val));
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          data={exploreList}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
    alignItems: 'flex-start',
    marginLeft: ScaleW(7),
    flex: 1,
  },
});
