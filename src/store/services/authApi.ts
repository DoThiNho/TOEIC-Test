import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: 'api/auth/login',
        method: 'POST',
        body: { ...credentials }
      })
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

export const { useLoginMutation, useRegisterMutation } = authApi;
