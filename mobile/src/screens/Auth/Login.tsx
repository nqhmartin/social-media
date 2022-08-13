import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FONT, ScaleH, ScaleW} from '../../shared/common';
import Cinput from '../../shared/components/Input/CInput';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ModalLanguage from './components/modalChooseLanguage';
import * as Yup from 'yup';
import {translate} from '../../shared/translate/translate';
import {useDispatch, useSelector} from 'react-redux';
import {LANGUAGE} from './constants';
import store from '../../core';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {loginStart} from './redux/action';
import ModalLoading from '../../shared/components/Modal/loading';
interface Props {}
interface MyFormValues {
  username: string;
  password: string;
}
const Login: React.FC<Props> = ({navigation}: any) => {
  const [isModalLanguage, setisModalLanguage] = useState<boolean>(false);
  const [labelLanguage, setlabelLanguage] = useState<string>('');
  const initialValues: MyFormValues = {username: '', password: ''};
  const [infor, setinfor] = useState({});
  const dispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.rootStore.isLoading);
  const errorMessage = useSelector(
    (state: any) => state.rootStore.errorMessage,
  );
  useEffect(() => {
    const indexLanguage = LANGUAGE.filter(
      item => item.value == store.getState().rootStore.language,
    );
    setlabelLanguage(indexLanguage[0].label);

    GoogleSignin.configure({
      webClientId:
        '512554377569-htllij5afdkel19lb2fmlgie375j8631.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const loginWithGG = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setinfor(userInfo);
    } catch (error: any) {
      console.log(
        '🚀 ~ file: Login.tsx ~ line 54 ~ loginWithGG ~ error',
        error,
      );

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const submitLogin = (values: any) => {
    const val = {
      username: values.username,
      password: values.password,
    };

    dispatch(loginStart(val));
  };

  const signupSchema = Yup.object().shape({
    username: Yup.string().required(translate('auth:errorInput')),
    password: Yup.string().required(translate('auth:errorInput')),
  });
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'white'}
        showHideTransition={'slide'}
        barStyle={'dark-content'}
        animated
      />
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.languageBtn}
            onPress={() => setisModalLanguage(true)}>
            <Text style={styles.languageBtnText}>
              {translate(labelLanguage)}
            </Text>
            <Image
              source={require('../../assets/icons/down.png')}
              style={styles.languageBtnIcon}
            />
          </TouchableOpacity>

          <View style={styles.logo}>
            <Image
              source={require('../../assets/images/logo/travelvn1.png')}
              resizeMode="contain"
              style={{height: ScaleH(100)}}
            />
          </View>

          <TouchableOpacity style={styles.loginFbBtn} onPress={loginWithGG}>
            <Image
              style={styles.loginFbBtnIcon}
              source={require('../../assets/icons/google.png')}
            />
            <Text style={styles.loginFbBtnText}>
              {translate('auth:loginGG')}
            </Text>
          </TouchableOpacity>

          <View style={styles.or}>
            <View style={styles.orLine} />
            <Text style={styles.orLineText}>{translate('auth:or')}</Text>
            <View style={styles.orLine} />
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
              return (
                <View style={styles.box}>
                  {errorMessage && (
                    <Text style={styles.errors}>{errorMessage}</Text>
                  )}
                  <Cinput
                    placeholder={translate('auth:placeholderUser')}
                    onChangeText={(txt: any) => setFieldValue('username', txt)}
                    values={values.username}
                    showText={false}
                  />
                  {errors.username && (
                    <Text style={styles.errors}>{errors.username}</Text>
                  )}
                  <Cinput
                    placeholder={translate('auth:placeholderPass')}
                    onChangeText={(txt: any) => setFieldValue('password', txt)}
                    values={values.password}
                    showText={true}
                  />
                  {errors.password && (
                    <Text style={styles.errors}>{errors.password}</Text>
                  )}

                  <TouchableOpacity style={styles.forgotBtn}>
                    <Text style={styles.forgotBtnText}>
                      {translate('auth:forgotPass')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={handleSubmit}>
                    <Text style={styles.loginBtnText}>
                      {translate('auth:login')}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.signup}>
                    <Text style={[styles.signupText, {color: '#AEA9A9'}]}>
                      {translate('auth:noAccount')}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('SignUp')}>
                      <Text style={[styles.signupText, {color: '#267FF3'}]}>
                        {' '}
                        {translate('auth:signUp')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          </Formik>
          <View style={styles.bottom}>
            <Text style={styles.bottomText}>From</Text>
            <Text style={styles.bottomText100}>NQH MARTIN</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <ModalLanguage
        isVisible={isModalLanguage}
        onClose={() => setisModalLanguage(false)}
        title={translate('alert:chooseLang')}
        onChange={(e: string) => setlabelLanguage(e)}
      />
      <ModalLoading isVisible={isLoading} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 9,
    marginHorizontal: ScaleW(20),
  },
  languageBtn: {
    width: ScaleW(90),
    alignSelf: 'center',
    marginTop: ScaleH(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageBtnText: {
    fontSize: ScaleH(18),
    color: '#C5C5C5',
  },
  languageBtnIcon: {
    height: ScaleH(16),
    width: ScaleW(21),
    tintColor: '#C5C5C5',
  },
  logo: {
    marginVertical: ScaleH(50),
    alignSelf: 'center',
  },
  loginFbBtn: {
    width: '100%',
    height: ScaleH(38),
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  loginFbBtnIcon: {
    height: ScaleH(28),
    width: ScaleW(28),
  },
  loginFbBtnText: {
    color: '#AEA9A9',
    fontSize: ScaleW(18),
    paddingLeft: ScaleW(6),
  },
  or: {
    marginTop: ScaleH(35),
    flexDirection: 'row',
    alignItems: 'center',
  },
  orLine: {
    height: ScaleH(1),
    backgroundColor: '#CCCCCC',
    flex: 4,
  },
  orLineText: {
    flex: 2,
    textAlign: 'center',
    fontSize: ScaleW(15),
  },
  box: {
    marginTop: ScaleH(40),
  },
  forgotBtn: {
    alignItems: 'flex-end',
  },
  forgotBtnText: {
    fontSize: ScaleW(14),
    color: '#1877F2',
  },
  loginBtn: {
    width: '100%',
    height: ScaleH(35),
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ScaleH(35),
    borderRadius: 5,
  },
  loginBtnText: {
    fontSize: ScaleW(15),
    color: '#FFFEFE',
  },
  signup: {
    marginTop: ScaleH(30),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: ScaleW(15),
  },
  bottom: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ScaleH(60),
  },
  bottomText: {
    fontSize: ScaleW(15),
    color: '#AEA9A9',
    fontWeight: '500',
  },
  bottomText100: {
    color: '#070000',
    letterSpacing: 1,
    fontWeight: '400',
  },
  errors: {
    fontSize: ScaleW(12),
    color: 'red',
    fontStyle: 'italic',
    marginTop: ScaleH(-5),
    marginBottom: ScaleH(5),
  },
});
