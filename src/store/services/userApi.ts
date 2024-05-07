import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { localStorageClient } from 'utils/localStorage.util';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
    prepareHeaders: (headers) => {
      const token = localStorageClient.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    }
  }),
  endpoints: (build) => ({
    getUser: build.query({
      query: () => 'api/users/me'
    })
  })
});

export const { useGetUserQuery } = userApi;
