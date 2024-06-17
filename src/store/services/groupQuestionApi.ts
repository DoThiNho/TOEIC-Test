import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'constants/constant';

export const groupQuestionApi = createApi({
  reducerPath: 'groupQuestionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
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
