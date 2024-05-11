import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const questionApi = createApi({
  reducerPath: 'questionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/'
  }),
  endpoints: (build) => ({
    getQuestions: build.query({
      query: (params) => {
        const { id, type, part } = params;
        return `api/questions/${id}?type=${type}&part=${part.join('&part=')}`;
      }
    })
  })
});

export const { useGetQuestionsQuery } = questionApi;
