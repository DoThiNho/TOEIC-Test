import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'constants/constant';

export const questionApi = createApi({
  reducerPath: 'questionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  endpoints: (build) => ({
    getQuestions: build.query({
      query: (params) => {
        const { id, type, part } = params;
        return `api/questions/${id}?type=${type}&part=${part.join('&part=')}`;
      }
    }),
    addQuestions: build.mutation({
      query: (formData) => ({
        url: 'api/questions',
        method: 'POST',
        body: formData
      })
    }),
    updateQuestion: build.mutation({
      query: ({ id, formData }) => ({
        url: `api/questions/${id}`,
        method: 'POST',
        body: formData
      })
    })
  })
});

export const { useGetQuestionsQuery, useUpdateQuestionMutation, useAddQuestionsMutation } =
  questionApi;
