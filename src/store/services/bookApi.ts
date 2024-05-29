import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/'
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
