import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'constants/constant';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  tagTypes: ['Books'],

  endpoints: (build) => ({
    getBooks: build.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return `api/books?${queryParams}`;
      },
      providesTags: ['Books']
    }),
    addBook: build.mutation({
      query: (title) => ({
        url: 'api/books',
        method: 'POST',
        body: { title }
      }),
      invalidatesTags: ['Books']
    }),
    deleteBookById: build.mutation({
      query: (id) => ({
        url: `api/books/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Books']
    })
  })
});

export const { useGetBooksQuery, useAddBookMutation, useDeleteBookByIdMutation } = bookApi;
