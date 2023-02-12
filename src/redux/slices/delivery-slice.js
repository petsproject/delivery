import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
  items: [],
  status: 'loading',
};

export const fetchDeliveries = createAsyncThunk(
  'deliveries/fetchDeliveries',
  async () => {
    const { data } = await axios.get('/deliveries');
    return data;
  }
);

export const fetchRemoveDelivery = createAsyncThunk(
  'deliveries/fetchRemoveDelivery',
  async (id) => {
    axios.delete(`/deliveries/${id}`);
  }
);

const deliveriesSlice = createSlice({
  name: 'deliveries',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDeliveries.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchDeliveries.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'loaded';
    },
    [fetchDeliveries.rejected]: (state) => {
      state.items = [];
      state.status = 'error';
    },
    [fetchRemoveDelivery.pending]: (state, action) => {
      state.items = state.items.filter((obj) => obj._id !== action.meta.arg);
    },
  },
});

export const deliveriesReducer = deliveriesSlice.reducer;
