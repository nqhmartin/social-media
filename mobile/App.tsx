import React, {useEffect} from 'react';
import Navigator from './src/navigator/index';
import {enableLatestRenderer} from 'react-native-maps';
enableLatestRenderer();
import {I18nextProvider} from 'react-i18next';
import i18next, {translate} from './src/shared/translate/translate';
import {Provider} from 'react-redux';
import store from './src/core/index';
import {View} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import codePush, {CodePushOptions} from 'react-native-code-push';
import {pushNotication} from './src/configs/pushNotification';
type Props = {};

let persistor = persistStore(store);

const App = (props: Props) => {
  useEffect(() => {
    pushNotication();
  }, []);

  return (
    <View style={{flex: 1}}>
      <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigator />
          </PersistGate>
        </Provider>
      </I18nextProvider>
    </View>
  );
};

export default codePush({
  deploymentKey: 'JGtSeZAhjafmozfAWWL4Sz0nMq2WY9R4JQron',
  installMode: codePush.InstallMode.IMMEDIATE,
  updateDialog: {
    title: 'Phiên bản mới',
    appendReleaseDescription: true,
    descriptionPrefix: 'Đã có bản cập nhật mới!', // Bắt buộc cập nhật
    mandatoryUpdateMessage: 'Đã có bản cập nhật mới!',
    mandatoryContinueButtonLabel: 'Cập nhật', // Bắt buộc cập nhật
    optionalIgnoreButtonLabel: 'Để sau',
    optionalInstallButtonLabel: 'Cập nhật',
    optionalUpdateMessage: 'Đã có bản cập nhật mới!',
  },
} as CodePushOptions)(App);
