import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from 'types';

const INITIAL_STATE = {
  userDetail: {}
} as IUserState;

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setUserDetail: (state: IUserState, action: PayloadAction<IUserState>) => {
      const { user } = action.payload;
      state.user = user;
    }
  }
});

export const { setUserDetail } = userSlice.actions;

export default userSlice.reducer;
