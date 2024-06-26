import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'constants/constant';
import { localStorageClient } from 'utils/localStorage.util';

export const resultApi = createApi({
  reducerPath: 'resultApi',
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
  tagTypes: ['Results', 'ResultsByUser'],
  endpoints: (build) => ({
    getResults: build.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return `api/results?${queryParams}`;
      },
      providesTags: ['Results']
    }),
    getResultById: build.query({
      query: (id) => `api/results/${id}`
    }),
    getResultByTestId: build.query({
      query: (testId) => {
        return `api/tests/${testId}/results`;
      }
    }),
    getResultByUserId: build.query({
      query: (userId) => {
        return `api/results/user/${userId}`;
      },
      providesTags: (_result, _error, arg) => [{ type: 'Results', id: arg.id }]
    }),
    deleteResultById: build.mutation({
      query: (id) => ({
        url: `api/results/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Results', id: arg.id }]
    })
  })
});

export const {
  useGetResultsQuery,
  useGetResultByIdQuery,
  useGetResultByUserIdQuery,
  useGetResultByTestIdQuery,
  useDeleteResultByIdMutation
} = resultApi;
