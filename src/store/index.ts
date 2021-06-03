/* eslint-disable @typescript-eslint/no-var-requires */
import { useDispatch } from 'react-redux';
import { configureStore, StoreEnhancer } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { ENV } from '@env';
import { offline, createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import { OfflineState } from '@redux-offline/redux-offline/lib/types';

const middlewares: any[] = [];
const offlineEnhancer = createOffline(offlineConfig);

const dev = ENV === 'dev';

if (dev) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(offlineEnhancer.middleware);
  middlewares.push(createDebugger());
}
const store = configureStore({
  reducer: rootReducer,
  devTools: dev,
  enhancers: [offline(offlineConfig) as StoreEnhancer],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type STATE = ReturnType<typeof store.getState>;
export interface RootState extends STATE {
  offline: OfflineState;
}
export default store;
