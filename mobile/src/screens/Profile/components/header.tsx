import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ScaleH, ScaleW} from '../../../shared/common';

interface Props {
  data: any;
}

const Header: React.FC<Props> = props => {
  const {data} = props;

  return (
    <View>
      <View style={styles.headerTop}>
        <TouchableOpacity>
          <Image
            style={styles.headerTopIcon}
            source={require('../../../assets/icons/left.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerTopText}>@{data?.user?.username}</Text>

        <TouchableOpacity>
          <Image
            style={styles.headerTopIcon}
            source={require('../../../assets/icons/edit.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Image style={styles.inforImage} source={{uri: data?.user?.images}} />
        <Text style={styles.infoText}>{data?.user?.fullName}</Text>
      </View>

      <View style={styles.tracking}>
        <View style={styles.trackingItem}>
          <Text style={styles.trackingItemText}>{data?.placesVisited}</Text>
          <Text style={styles.trackingItemText100}>Places visited</Text>
        </View>
        <View style={styles.trackingItem}>
          <Text style={styles.trackingItemText}>{data?.placesToVisit}</Text>
          <Text style={styles.trackingItemText100}>Places to visit</Text>
        </View>
        <View style={styles.trackingItem}>
          <Text style={styles.trackingItemText}>{data?.following}</Text>
          <Text style={styles.trackingItemText100}>Following</Text>
        </View>
        <View style={styles.trackingItem}>
          <Text style={styles.trackingItemText}>{data?.follower}</Text>
          <Text style={styles.trackingItemText100}>Follower</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: ScaleW(16),
    alignItems: 'center',
  },
  headerTopIcon: {
    width: ScaleW(30),
    height: ScaleW(30),
    tintColor: '#2d323FE',
  },
  headerTopText: {
    fontSize: ScaleW(16),
    color: '#7C8089',
  },
  info: {
    alignSelf: 'center',
    marginTop: ScaleH(8),
  },
  inforImage: {
    height: ScaleW(88),
    width: ScaleW(88),
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#7c8089',
  },
  infoText: {
    fontSize: ScaleW(16),
    color: '#0C0F14',
    fontWeight: '500',
    marginTop: ScaleH(8),
  },
  tracking: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: ScaleH(20),
  },
  trackingItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackingItemText: {
    fontSize: ScaleW(16),
    color: '#0C0F14',
    fontWeight: 'bold',
  },
  trackingItemText100: {
    fontSize: ScaleW(13),
    color: '#0C0F14',
  },
});
