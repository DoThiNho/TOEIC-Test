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
    getResultByTestId: build.query({
      query: (id) => {
        return `api/results/${id}`;
      }
    })
  })
});

export const { useGetResultByTestIdQuery } = resultApi;
