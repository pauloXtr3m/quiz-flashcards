import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_STORAGE_KEY = 'QuizFlashCards:notifications';

export const clearLocalNotification = () => {
    return AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
};

export const getLocalNotification = () => {
    return {
        title: '📖 Improve your knowledge',
        body: 'Lets study and play some quiz!',
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
};

export const getNotificationOptions = (time) => {
    return {
        time,
        repeat: 'day',
    }
};

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY)
      .then(JSON.parse)
      .then(data => {
          if(!data){
              Permissions.askAsync(Permissions.NOTIFICATIONS)
                  .then(({status}) => {
                      if(status === 'granted'){
                          Notifications.cancelAllScheduledNotificationsAsync();

                          let tomorrow = new Date();

                          tomorrow.setDate(tomorrow.getDate() + 1);
                          tomorrow.setHours(16);
                          tomorrow.setMinutes(45);

                          Notifications.scheduleLocalNotificationAsync(
                              getLocalNotification(),
                              getNotificationOptions(tomorrow),
                          );

                          AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(true));
                      }
                  })
          }
      })
};