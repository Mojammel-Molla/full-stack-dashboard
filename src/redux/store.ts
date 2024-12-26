import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/auth.slice';
import storage from 'redux-persist/lib/storage';
import { baseApi } from './base.api';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Persist configuration for authentication
const authPersistConfig = {
  key: 'p-auth',
  storage,
};


// Apply persist configurations to reducers
const authPersistedReducer = persistReducer(authPersistConfig, authReducer);


// Configure the Redux store
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // Base API slice
    auth: authPersistedReducer, // Persisted auth reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore redux-persist actions
      },
    }).concat(baseApi.middleware), // Add API middleware
});

// Infer the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create the persistor for redux-persist
export const persistor = persistStore(store);
