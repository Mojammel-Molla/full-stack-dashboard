import { tagTypes, baseApi } from '@/redux/base.api';
import { createSlice } from '@reduxjs/toolkit';
type TUser = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};

type TInitialState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => {
      baseApi.util.invalidateTags(tagTypes);
    });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
