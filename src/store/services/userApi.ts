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
  tagTypes: ['Users', 'User'],
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => 'api/users',
      providesTags: ['Users']
    }),
    getUser: build.query({
      query: () => 'api/users/me',
      providesTags: ['User']
    }),
    getUserById: build.query({
      query: (id) => `api/users/${id}`
    }),
    updateUser: build.mutation({
      query: (userData) => ({
        url: 'api/users/me',
        method: 'PUT',
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
    }),
    addUser: build.mutation({
      query: (user) => ({
        url: 'api/auth/register',
        method: 'POST',
        body: { ...user }
      }),
      invalidatesTags: ['Users']
    }),
    deleteUserById: build.mutation({
      query: (id) => ({
        url: `api/users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Users']
    })
  })
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useSetAvatarMutation,
  useUpdateUserMutation,
  useAddUserMutation,
  useDeleteUserByIdMutation
} = userApi;
