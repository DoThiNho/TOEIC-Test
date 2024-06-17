import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'constants/constant';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
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
