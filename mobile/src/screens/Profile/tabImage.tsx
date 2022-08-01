import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ScaleH, ScaleW} from '../../shared/common';

const DEVICES_WIDTH = Dimensions.get('screen').width;

interface Props {
  data: any;
}

const renderItem = ({item, index}: any) => {
  return (
    <TouchableOpacity style={styles.item}>
      <Image
        resizeMode="cover"
        style={styles.itemImg}
        source={{uri: item?.images}}
      />
    </TouchableOpacity>
  );
};
const TabImage: React.FC<Props> = props => {
  const {data} = props;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TabImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: ScaleW(16),
    paddingBottom: ScaleW(-16),
  },
  item: {
    margin: ScaleW(2),
  },
  itemImg: {
    width: DEVICES_WIDTH / 3 - 15,
    height: ScaleH(130),
    borderRadius: 5,
  },
});
