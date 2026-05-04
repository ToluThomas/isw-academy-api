import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import postReducer from './slices/postSlice';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  PAUSE,
  FLUSH,
  persistReducer,
  persistStore,
  REGISTER,
  REHYDRATE,
  PURGE,
  PERSIST,
} from 'redux-persist';

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     posts: postReducer,
//   },
// })

const combinedReducers = combineReducers({
  counter: counterReducer,
  posts: postReducer,
});

const persistConfig = {
  key: 'root',
  storage: EncryptedStorage,
  blacklist: ['counter'], // counter state will not be persisted
};

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  reducer: persistedReducer,
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
