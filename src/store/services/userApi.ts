import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'constants/constant';
import { IUser } from 'types';
import { SuccessResponse } from 'types/api';
import { User } from 'types/user';
import { localStorageClient } from 'utils/localStorage.util';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
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
    getUsers: build.query<SuccessResponse<IUser[]>, void>({
      query: () => 'api/users',
      providesTags: ['Users']
    }),
    getUser: build.query({
      query: () => 'api/users/me',
      providesTags: ['User']
    }),
    getUserById: build.query<SuccessResponse<IUser>, string>({
      query: (id) => `api/users/${id}`
    }),
    updateUser: build.mutation<SuccessResponse<IUser>, User>({
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
