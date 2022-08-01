import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ratioH, ScaleH, ScaleW} from '../../../shared/common';
import ItemComment from '../components/itemComment';
import {translate} from '../../../shared/translate/translate';
const DEVICE_WITDH = Dimensions.get('window').width;

interface Props {
  route: any;
  navigation: any;
}

const DetailItem: React.FC<Props> = props => {
  const [imgWidth, setimgWidth] = useState(0);
  const [imgHeight, setimgHeight] = useState(0);
  const item = props.route?.params?.item;
  console.log('🚀 ~ file: index.tsx ~ line 22 ~ item', item);

  const renderItem = ({item, index}: any) => {
    return <ItemComment item={item} />;
  };

  useEffect(() => {
    Image.getSize(item?.images, (width, height) => {
      const screenWidth = Dimensions.get('window').width;
      const scaleFactor = width / screenWidth;
      const imageHeight = height / scaleFactor;
      setimgHeight(imageHeight);
      setimgWidth(screenWidth);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <ScrollView>
        <View style={{marginBottom: ScaleH(36)}}>
          <ImageBackground
            style={{width: imgWidth, height: imgHeight}}
            source={{uri: item?.images}}
            resizeMode="contain">
            <TouchableOpacity
              style={styles.back}
              onPress={() => props.navigation.goBack()}>
              <Image
                style={styles.backIcon}
                source={require('../../../assets/icons/left.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.location}>
              <Image
                source={{uri: item.location?.images}}
                style={styles.locationIcon}
              />
              <Text style={styles.locationText}>{item?.location?.name}</Text>
            </TouchableOpacity>
          </ImageBackground>

          <View>
            <Image source={{uri: item.user?.images}} style={styles.avatar} />
            <View style={styles.action}>
              <TouchableOpacity style={styles.actionBtn}>
                <Image
                  source={require('../../../assets/icons/placeholder.png')}
                  style={styles.actionBtnIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Image
                  source={require('../../../assets/icons/heart.png')}
                  style={styles.actionBtnIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Image
                  source={require('../../../assets/icons/messenger.png')}
                  style={styles.actionBtnIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.infor}>
            <Text style={styles.inforText}>{item.user?.name}</Text>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followBtnText}>
                {translate('home:follow')}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.contentText}>{item.content}</Text>
          <Text style={styles.contentTextTime}>Posted 2hr ogo</Text>
          <View style={styles.comment}>
            <FlatList
              data={item?.comment}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.commentMe}>
              <Image
                source={{uri: item?.user?.images}}
                style={styles.avatarComment}
              />
              <View style={styles.commentMe100}>
                <TextInput
                  style={styles.commentMe100Input}
                  placeholder="Leave a comment"
                  multiline
                  placeholderTextColor={'#70737A'}
                />
                <TouchableOpacity style={styles.commentMe100Btn}>
                  <Text style={styles.commentMe100BtnText}>Publicar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  back: {
    position: 'absolute',
    top: ScaleH(52),
    left: ScaleW(16),
    backgroundColor: 'white',
    borderRadius: 10,
    height: ScaleW(35),
    width: ScaleW(35),
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  backIcon: {
    width: ScaleW(22),
    height: ScaleW(22),
  },
  location: {
    height: ScaleW(35),
    backgroundColor: 'white',
    position: 'absolute',
    top: ScaleH(52),
    right: ScaleW(16),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ScaleW(8),
    borderRadius: 5,
    opacity: 0.8,
  },
  locationIcon: {
    height: ScaleW(20),
    width: ScaleW(20),
  },
  locationText: {
    paddingLeft: ScaleW(8),
    fontSize: ScaleW(13),
    color: '#0C0F14',
  },
  avatar: {
    width: ScaleW(48),
    height: ScaleW(48),
    position: 'absolute',
    top: ScaleH(-25),
    left: ScaleW(16),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    elevation: 10,
  },
  action: {
    position: 'absolute',
    top: ScaleH(-25),
    right: ScaleW(-7),
    height: ScaleW(55),
    flexDirection: 'row',
    padding: ScaleW(1),
  },
  actionBtn: {
    width: ScaleW(48),
    height: ScaleW(48),
    borderRadius: 50,
    backgroundColor: 'white',
    marginRight: ScaleW(24),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    zIndex: 100,
  },
  actionBtnIcon: {
    width: ScaleW(26),
    height: ScaleW(26),
  },
  content: {
    marginHorizontal: ScaleW(16),
  },
  infor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inforText: {
    fontSize: ScaleW(16),
    color: '#0C0F14',
    fontWeight: 'bold',
  },
  followBtn: {
    backgroundColor: '#F0F0F0',
    marginLeft: ScaleW(14),
    paddingHorizontal: ScaleW(20),
    paddingVertical: ScaleH(6),
  },
  followBtnText: {
    fontSize: ScaleW(14),
    color: '#70737A',
  },
  contentText: {
    marginTop: ScaleH(12),
    fontSize: ScaleW(14),
    color: '#2D323E',
    lineHeight: ScaleH(18),
  },
  contentTextTime: {
    fontSize: ScaleW(13),
    marginTop: ScaleH(8),
  },
  comment: {
    marginHorizontal: ScaleW(16),
    paddingBottom: ScaleH(30),
  },
  avatarComment: {
    width: ScaleW(32),
    height: ScaleW(32),
  },
  commentMe: {
    flexDirection: 'row',
    marginTop: ScaleH(16),
    alignItems: 'center',
  },
  commentMeInput: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    width: '90%',
    borderRadius: 10,
    paddingLeft: ScaleW(16),
    paddingVertical: ScaleH(10),
    marginLeft: ScaleW(8),
    paddingRight: ScaleW(30),
  },
  commentMe100: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    flex: 1,
    borderRadius: 10,
    marginLeft: ScaleW(8),
  },
  commentMe100Input: {
    paddingLeft: ScaleW(16),
    flex: 7.5,
  },
  commentMe100Btn: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentMe100BtnText: {
    color: '#0F44CC',
  },
});
