import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import postsReducer from './slices/postsSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import EncryptedStorage from 'react-native-encrypted-storage';

const combinedReducers = combineReducers({
  counter: counterReducer,
  posts: postsReducer,
});

const persistConfig = {
  key: 'root',
  storage: EncryptedStorage,
  blacklist: ['counter'], // we don't want to keep count
};

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
