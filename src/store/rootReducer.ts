import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import locationReducer from './slices/location';
const rootReducer = combineReducers({
  auth: authReducer,
  location: locationReducer,
});

export default rootReducer;
