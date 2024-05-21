import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/'
  }),
  endpoints: (build) => ({
    addQuestion: build.mutation({
      query: (prompt) => ({
        url: 'api/chat',
        method: 'POST',
        body: { prompt }
      })
    })
  })
});

export const { useAddQuestionMutation } = chatApi;
