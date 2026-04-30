import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../reduxSlices/userSlice';
import postsReducer from '../reduxSlices/postsSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  REHYDRATE,
  PURGE,
  REGISTER,
} from 'redux-persist';
import EncryptedStorage from 'react-native-encrypted-storage';

//Our store before we added persist
// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     posts: postsReducer,
//   }
// });

const combinedReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

const persistConfig = {
  key: 'root',
  storage: EncryptedStorage,
  blacklist: ['user'], //usefull when you dont want to persist a reducer
  // whitelist: [''] //usefull to state the reducers/slice we want to persist
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,

  // to prevent the non-serializer value redux-type issue
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
