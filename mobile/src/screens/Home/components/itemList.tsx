import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ScaleH, ScaleW} from '../../../shared/common';
import {formatTimeAgo} from '../../../shared/constant';
import moment from 'moment';
interface Props {
  item: any;
  navigation: any;
  index: number;
}
const DEVICE_WITDH = Dimensions.get('screen').width / 2;

const ItemList: React.FC<Props> = ({item, index, navigation}: any) => {
  return (
    <TouchableOpacity
      style={[styles.item]}
      onPress={() => navigation.navigate('DetailItem', {item})}>
      <View style={styles.itemTop}>
        <Image source={{uri: item.user?.avatar}} style={styles.itemAvatar} />
        <Text style={styles.itemTopText}>{item.user?.fullName}</Text>
      </View>
      <View>
        <Image
          source={{uri: item?.images}}
          style={styles.itemImages}
          resizeMode="cover"
        />
        <Image
          source={{uri: item?.location?.icon}}
          style={styles.itemCountries}
        />
      </View>
      <View style={styles.itemContent}>
        <Text numberOfLines={2} style={styles.itemContentText}>
          {item.content}
        </Text>
        <Text style={styles.itemContentCreated}>
          {formatTimeAgo(item.createdAt.toString())}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  item: {
    width: DEVICE_WITDH - 25,
    marginLeft: ScaleW(14),
    marginTop: ScaleW(10),
  },
  itemTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemAvatar: {
    width: ScaleW(24),
    height: ScaleW(24),
    borderRadius: 50,
  },
  itemTopText: {
    fontSize: ScaleW(12),
    fontWeight: 'bold',
    color: '#0c0F14',
    marginLeft: ScaleW(5),
  },
  itemImages: {
    width: '100%',
    height: ScaleH(250),
    marginTop: ScaleH(8),
    borderRadius: 5,
  },
  itemCountries: {
    height: ScaleW(25),
    width: ScaleW(25),
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
  itemContent: {
    marginTop: ScaleH(8),
  },
  itemContentText: {
    fontSize: ScaleW(12),
    paddingRight: ScaleW(20),
    color: '#0c0F14',
  },
  itemContentCreated: {
    color: '#535353',
    fontSize: ScaleW(10),
    marginTop: ScaleH(8),
  },
});
