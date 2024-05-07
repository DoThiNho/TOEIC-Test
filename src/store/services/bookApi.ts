import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/'
  }),
  endpoints: (build) => ({
    getBooks: build.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return `api/books?${queryParams}`;
      }
    })
  })
});

export const { useGetBooksQuery } = bookApi;
