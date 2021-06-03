import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { log } from '@utils/console';
import Geolocation from 'react-native-geolocation-service';
import axiosService from '@services/axiosService';

interface IPoints {
  id: string;
  latitude: number;
  longitude: number;
  speed: number;
  time: string;
}

type InitialState = {
  timer: number;
  isServiceActive: boolean;
  location: Partial<Geolocation.GeoPosition>;
  points: IPoints[];
  keys: string[];
  loadedAll: boolean;
};

export const getPointsById = createAsyncThunk(
  '@location/getPointsById',
  async (id: string) => {
    const { data } = await axiosService.get(`points/${id}`);
    return data.points;
  },
);

const initialState: InitialState = {
  isServiceActive: false,
  timer: 1000,
  location: {},
  points: [],
  keys: [],
  loadedAll: false,
};

const locationSlice = createSlice({
  name: 'location',
  initialState: initialState,
  reducers: {
    createPoint: {
      reducer: (state, action) => {
        if (action.payload.id) {
          state.points.push({
            ...action.payload,
          });
        }
      },
      prepare(payload: IPoints) {
        return {
          payload,
          meta: {
            offline: {
              // the network action to execute:
              effect: {
                url: `http://10.0.2.2:8082/points/${payload.id}`,
                method: 'POST',
                json: { ...payload },
              },
              // action to dispatch when effect succeeds:
              commit: {
                type: 'location/createPoint',
                meta: {
                  payload,
                },
              },
              // action to dispatch if network action fails permanently:
              rollback: {
                type: 'location/failCall',
                meta: {
                  payload,
                },
              },
            },
          },
          error: {},
        };
      },
    },
    saveKeys(state, action) {
      state.keys = action.payload;
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

    failCall(state, action) {
      log(action, 'fail');
    },
    handleLoad(state, action) {
      state.loadedAll = action.payload;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(getPointsById.fulfilled, (state, action) => {
      state.points.push(action.payload);
    });
    addCase(getPointsById.pending, (state, action) => {
      state.points = [];
    });
  },
});

export const {
  createPoint,
  changeTimer,
  toggleService,
  handleLocation,
  saveKeys,
  handleLoad,
} = locationSlice.actions;
const locationReducer = locationSlice.reducer;
export default locationReducer;
