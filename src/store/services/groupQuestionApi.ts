import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const groupQuestionApi = createApi({
  reducerPath: 'groupQuestionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/'
  }),
  endpoints: (build) => ({
    getGroupQuestions: build.query({
      query: (params) => {
        const { id, type, part } = params;
        return `api/group-question/${id}?type=${type}&part=${part.join('&part=')}`;
      }
    })
  })
});

export const { useGetGroupQuestionsQuery } = groupQuestionApi;
