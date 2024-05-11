import { configureStore } from '@reduxjs/toolkit';
import { authApi } from 'store/services/authApi';
import { userApi } from 'store/services/userApi';
import { bookApi } from 'store/services/bookApi';
import { testApi } from 'store/services/testApi';
import userReducer from 'store/slices/userSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { resultApi } from 'store/services/resultApi';
import { questionApi } from 'store/services/questionApi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [testApi.reducerPath]: testApi.reducer,
    [resultApi.reducerPath]: resultApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(bookApi.middleware)
      .concat(testApi.middleware)
      .concat(resultApi.middleware)
      .concat(questionApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
