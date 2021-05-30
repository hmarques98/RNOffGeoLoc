import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { log } from '@utils/console';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    timer: 1000,
    isServiceActive: false,
  },
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
  },
});

export const { callUsers, changeTimer, toggleService } = locationSlice.actions;
const locationReducer = locationSlice.reducer;
export default locationReducer;
