import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { localStorageClient } from 'utils/localStorage.util';

export const userAnswerApi = createApi({
  reducerPath: 'userAnswerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
    prepareHeaders: (headers) => {
      const token = localStorageClient.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    }
  }),
  endpoints: (build) => ({
    addUserAnswers: build.mutation({
      query: (data) => ({
        url: 'api/tests/answers',
        method: 'POST',
        body: {
          answers: data.answers,
          user_id: data.userId,
          test_id: data.testId,
          parts: data.parts,
          start_time: data.startTime,
          complete_time: data.completeTime,
          total_correct: data.totalCorrect,
          total_questions: data.totalQuestions,
          type: data.type,
          title: data.title
        }
      })
    })
  })
});

export const { useAddUserAnswersMutation } = userAnswerApi;
