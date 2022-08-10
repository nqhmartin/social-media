import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {FONT, ScaleH, ScaleW} from '../../shared/common';
import ModalAddress from './components/modalAddress';
import {launchImageLibrary} from 'react-native-image-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {translate} from '../../shared/translate/translate';
import moment from 'moment';
interface Props {}
interface MyFormValues {
  content: string;
  addressCheckin: string;
  photo: any;
  isModalAddress: boolean;
  checkImage: string;
}
const Post: React.FC<Props> = () => {
  const initialValues: MyFormValues = {
    content: '',
    addressCheckin: '',
    photo: null,
    isModalAddress: false,
    checkImage: '',
  };

  const signupSchema = Yup.object().shape({
    content: Yup.string().required(translate('auth:errorInput')),
    addressCheckin: Yup.string().required(translate('auth:errorInput')),
    checkImage: Yup.string().required(translate('auth:errorInput')),
  });
  const submitLogin = (values: any) => {
    const createdAt = moment(new Date()).valueOf();

    // console.log(moment(createdAt).startOf('hours').fromNow());
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Create Post</Text>
      </View>

      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={values => submitLogin(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
        }) => {
          const handleUpload = () => {
            launchImageLibrary(
              {
                mediaType: 'photo',
                includeBase64: true,
              },
              (res: any) => {
                setFieldValue('photo', res.assets);
                setFieldValue('checkImage', 'hihi');
              },
            );
          };
          return (
            <View style={{margin: ScaleH(15)}}>
              <View style={styles.box}>
                <TextInput
                  placeholder="Write image post"
                  style={styles.inputContent}
                  multiline
                  onChangeText={(txt: any) => setFieldValue('content', txt)}
                  value={values.content}
                />
                {errors.content && (
                  <Text style={styles.errors}>{errors.content}</Text>
                )}
              </View>
              <View style={styles.box}>
                <Text style={styles.boxText}>Address check-in</Text>
                <TouchableOpacity
                  style={styles.boxBtn}
                  onPress={() => setFieldValue('isModalAddress', true)}>
                  <Text>{values.addressCheckin}</Text>
                  <Image
                    source={require('../../assets/icons/down.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                {errors.addressCheckin && (
                  <Text style={styles.errors}>{errors.addressCheckin}</Text>
                )}
              </View>
              {values.photo && (
                <Image
                  source={{uri: values.photo[0].uri}}
                  // resizeMode="contain"
                  style={styles.image}
                />
              )}
              <View style={styles.box}>
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={handleUpload}>
                  <Image source={require('../../assets/icons/upload.png')} />
                  {values.photo == null ? (
                    <Text style={styles.uploadBtnText}>Upload</Text>
                  ) : (
                    <Text style={styles.uploadBtnText}>Change</Text>
                  )}
                </TouchableOpacity>
                {errors.checkImage && (
                  <Text style={styles.errors}>{errors.checkImage}</Text>
                )}
              </View>
              <View style={styles.box}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.submitBtn}>
                  <Text style={styles.submitBtnText}>Post</Text>
                </TouchableOpacity>
              </View>
              <ModalAddress
                isVisible={values.isModalAddress}
                onClose={() => setFieldValue('isModalAddress', false)}
                item={values.addressCheckin}
                onChange={(val: string) => {
                  setFieldValue('isModalAddress', false);
                  setFieldValue('addressCheckin', val);
                }}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignSelf: 'center',
    fontSize: ScaleW(18),
    color: 'black',
    fontFamily: FONT.bold,
  },
  inputContent: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    height: ScaleH(100),
    textAlignVertical: 'top',
    padding: ScaleW(10),
  },
  box: {
    marginVertical: ScaleH(15),
  },
  boxText: {
    fontSize: ScaleW(14),
    marginBottom: ScaleH(4),
  },
  boxBtn: {
    height: ScaleH(45),
    width: '100%',
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ScaleW(10),
  },
  icon: {
    width: ScaleW(20),
    height: ScaleW(20),
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#558CFC',
    padding: ScaleH(10),
    width: '27%',
    borderRadius: 10,
    height: ScaleH(45),
    elevation: 5,
    marginBottom: ScaleH(5),
  },
  uploadBtnText: {
    color: 'white',
    paddingLeft: ScaleH(5),
  },
  image: {
    width: ScaleH(200),
    height: ScaleW(200),
    borderRadius: 10,
  },
  submitBtn: {
    width: '100%',
    height: ScaleH(45),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#558CFC',
    borderRadius: 10,
    elevation: 5,
  },
  submitBtnText: {
    fontSize: ScaleW(16),
    color: 'white',
  },
  errors: {
    color: 'red',
    fontSize: ScaleW(14),
    fontStyle: 'italic',
  },
});
