import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('/user/fetchAuth', async (params) => {
  const { data } = await axios.post('/users/login', params);
  return data;
});

export const fetchRegister = createAsyncThunk(
  '/user/fetchRegister',
  async (params) => {
    console.log(params);
    const { data } = await axios.post('/users/registration', params);
    return data;
  }
);

export const fetchGetUser = createAsyncThunk(
  '/user/fetchGetUser',
  async (params) => {
    const { data } = await axios.get('/users/get');
    return data;
  }
);

const initialState = {
  data: null,
  status: 'loading',
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchGetUser.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchGetUser.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchGetUser.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchRegister.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => state.user.data;

export const userReducer = userSlice.reducer;
export const { logout } = userSlice.actions;
