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
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUser: build.query({
      query: () => 'api/users/me',
      providesTags: ['User']
    }),
    updateUser: build.mutation({
      query: (userData) => ({
        url: 'api/users/me',
        method: 'POST',
        body: userData
      })
    }),
    setAvatar: build.mutation({
      query: (formData) => ({
        url: 'api/users/me/set-avatar',
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ['User']
    })
  })
});

export const { useGetUserQuery, useSetAvatarMutation, useUpdateUserMutation } = userApi;
