import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'store/slices/authSlice';
import userReducer from 'store/slices/userSlice';
import { authApi } from 'store/services/authApi';
import { userApi } from 'store/services/userApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
