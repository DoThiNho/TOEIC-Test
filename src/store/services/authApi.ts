import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'constants/constant';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: 'api/auth/login',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    loginWithGoogle: build.query({
      query: () => 'api/auth/google'
    }),
    register: build.mutation({
      query: (user) => ({
        url: 'api/auth/register',
        method: 'POST',
        body: { ...user }
      })
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useLoginWithGoogleQuery } = authApi;
