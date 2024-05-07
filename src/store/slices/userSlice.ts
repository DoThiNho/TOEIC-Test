import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState, User } from 'types';

const initialState: IUserState = {
  userDetail: {}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetail: (state, action: PayloadAction<User>) => {
      state.userDetail = action.payload;
    }
  }
});

const userReducer = userSlice.reducer;
export const { setUserDetail } = userSlice.actions;

export default userReducer;
