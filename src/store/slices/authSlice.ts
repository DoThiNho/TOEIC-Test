import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IAuthState } from 'types';

const INITIAL_STATE = {
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setCredentials: (state: IAuthState, action: PayloadAction<IAuthState>) => {
      const { token } = action.payload;
      state.token = token;
    },
    logOut: (state: IAuthState) => {
      state.token = null;
    }
  }
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
