import PushNotification from 'react-native-push-notification';
import store from '../core';
import { getTokenFirebase } from '../core/root/action';
export const pushNotication = () => {
  PushNotification.createChannel(
    {
      channelId: 'fcm_fallback_notification_channel', // (required)
      channelName: 'My channel', // (required)
    },
    created => console.log(`CreateChannel returned '${created}'`),
  );

  PushNotification.configure({
    onRegister: function (token) {
      store.dispatch(getTokenFirebase(token.token));
    },
    onNotification: function (notification: any) {
      console.log('NOTIFICATION:', notification);
      PushNotification.localNotification({
        channelId: notification.channelId,
        message: notification.message,
        title: notification.title,
        playSound: true,

      });
    },
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);

      // process the action
    },
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};
