import { configureStore } from '@reduxjs/toolkit';
import { login, logout, setSignUpStep } from './slices/AuthSlice';

import TwitterProfileSlice, {
  setTwitterProfile
} from './slices/TwitterProfileSlice';
import TimeLineSlice, { setTimeLine } from './slices/TimeLineSlice';
import AuthSlice from './slices/AuthSlice';
import OtherProfilelSlice, {
  setOtherTwitterProfile,
  setOtherTimeLine
} from './slices/OtherProfilelSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage
};
const authPersistedReducer = persistReducer(persistConfig, AuthSlice);
const profilePersistedReducer = persistReducer(
  persistConfig,
  TwitterProfileSlice
);
const timeLinePersistReducer = persistReducer(persistConfig, TimeLineSlice);

const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    profile: profilePersistedReducer,
    timeLine: timeLinePersistReducer,
    otherProfile: OtherProfilelSlice
  }
});

export const persistor = persistStore(store);

export {
  login,
  logout,
  setSignUpStep,
  setTwitterProfile,
  setTimeLine,
  setOtherTwitterProfile,
  setOtherTimeLine,
  store
};
