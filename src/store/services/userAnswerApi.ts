import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'constants/constant';
import { localStorageClient } from 'utils/localStorage.util';

export const userAnswerApi = createApi({
  reducerPath: 'userAnswerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
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
          total_corrects: data.totalCorrect,
          total_correct_listening: data.totalCorrectListening,
          total_correct_reading: data.totalCorrectReading,
          total_questions: data.totalQuestions,
          type: data.type,
          title: data.title
        }
      })
    })
  })
});

export const { useAddUserAnswersMutation } = userAnswerApi;
