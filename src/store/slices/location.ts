import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { log } from '@utils/console';
import axios from 'axios';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    text: '',
  },
  reducers: {
    callUsers: {
      reducer: (state, action) => {
        state.text = 'foi';
        log(action, 'action');
        log(action.meta, 'meta');
      },
      prepare: (text) => {
        log(text, 'text prepare');
        return {
          payload: text,
          meta: {
            offline: {
              // the network action to execute:
              effect: {
                url: 'https://jsonplaceholder.typicode.com/todos/1',
                method: 'GET',
              },
              // action to dispatch when effect succeeds:
              commit: {
                type: 'location/callUsers',
                meta: {
                  textMetaCommit: text,
                },
              },
              // action to dispatch if network action fails permanently:
              rollback: { type: 'location/failCall' },
            },
          },
        };
      },
    },
    failCall: {
      reducer: (state, action) => {
        log(action, 'caindo no fail');
      },
      prepare: () => {},
    },
  },
});

export const { callUsers } = locationSlice.actions;
const locationReducer = locationSlice.reducer;
export default locationReducer;
