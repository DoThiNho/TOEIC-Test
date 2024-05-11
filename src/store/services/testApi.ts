import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const testApi = createApi({
  reducerPath: 'testApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/'
  }),
  endpoints: (build) => ({
    getTests: build.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return `api/tests?${queryParams}`;
      }
    }),
    getTest: build.query({
      query: (id) => `api/tests/${id}`
    })
  })
});

export const { useGetTestsQuery, useGetTestQuery } = testApi;
