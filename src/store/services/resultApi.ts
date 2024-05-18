import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { localStorageClient } from 'utils/localStorage.util';

export const resultApi = createApi({
  reducerPath: 'resultApi',
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
    getResults: build.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return `api/results?${queryParams}`;
      }
    }),
    getResultById: build.query({
      query: (id) => `api/results/${id}`
    }),
    getResultByTestId: build.query({
      query: (testId) => {
        return `api/tests/${testId}/results`;
      }
    })
  })
});

export const { useGetResultsQuery, useGetResultByIdQuery, useGetResultByTestIdQuery } = resultApi;
