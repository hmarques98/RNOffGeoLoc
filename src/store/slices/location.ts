import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { log } from '@utils/console';
import Geolocation from 'react-native-geolocation-service';

type InitialState = {
  timer: number;
  isServiceActive: boolean;
  location: Partial<Geolocation.GeoPosition>;
};

const initialState: InitialState = {
  isServiceActive: false,
  timer: 1000,
  location: {},
};

const locationSlice = createSlice({
  name: 'location',
  initialState: initialState,
  reducers: {
    callUsers: {
      reducer: (state, action) => {
        log(action, 'action');
        log(action.meta, 'meta');
      },
      prepare(payload: string) {
        return {
          payload,
          meta: {
            offline: {
              // the network action to execute:
              effect: {
                url: 'https://jsonplaceholder.typicode.c/todos/1',
                method: 'GET',
              },
              // action to dispatch when effect succeeds:
              commit: {
                type: 'location/callUsers',
                meta: {
                  payload,
                },
              },
              // action to dispatch if network action fails permanently:
              rollback: { type: 'location/failCall' },
            },
          },
          error: {},
        };
      },
    },
    changeTimer(state, action) {
      state.timer = action.payload;
    },
    toggleService(state) {
      state.isServiceActive = !state.isServiceActive;
    },
    handleLocation(state, action) {
      state.location = action.payload;
    },
  },
});

export const { callUsers, changeTimer, toggleService, handleLocation } =
  locationSlice.actions;
const locationReducer = locationSlice.reducer;
export default locationReducer;
