import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'slices/auth';
import errorReducer from 'slices/error';
import tweetsReducer from 'slices/tweets';
import notificationReducer from './slices/notification';

const store = configureStore({
  reducer: {
    auth: authReducer,
    errors: errorReducer,
    notifications: notificationReducer,
    tweets: tweetsReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;