import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ScaleH, ScaleW} from '../../../shared/common';

interface Props {
  item: any;
}

const ItemComment: React.FC<Props> = props => {
  const {item} = props;
  return (
    <View style={styles.item}>
      <View style={{flex: 1}}>
        <Image source={{uri: item.avatar}} style={styles.itemAvatar} />
      </View>
      <View style={{flex: 9}}>
        <View style={styles.commentTop}>
          <Text style={styles.commentTopName}>{item.username}</Text>
          <Text style={styles.commentTopContent}>{item.content}</Text>
        </View>
        <View style={styles.commentBottom}>
          <TouchableOpacity style={styles.commentBottomBtn}>
            <Text style={styles.commentBottomBtnText}>Answer</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.commentBottomBtnText}>Like</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ItemComment;

const styles = StyleSheet.create({
  item: {
    marginTop: ScaleH(16),

    flexDirection: 'row',
  },
  itemAvatar: {
    width: ScaleW(32),
    height: ScaleW(32),
    borderRadius: 50,
  },
  commentTop: {
    flexDirection: 'row',
  },
  commentTopName: {
    marginHorizontal: ScaleW(8),
    color: '#0C0F14',
    fontWeight: 'bold',
    fontSize: ScaleW(14),
  },
  commentTopContent: {
    color: '#0C0F14',
    fontSize: ScaleW(14),
    // paddingRight: ScaleW(15),
  },
  commentBottom: {
    flexDirection: 'row',
    marginLeft: ScaleW(16),
    marginTop: ScaleH(2),
  },
  commentBottomBtn: {
    marginRight: ScaleW(16),
  },
  commentBottomBtnText: {
    color: '#70737A',
  },
});
