import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAnswerApi = createApi({
  reducerPath: 'userAnswerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/'
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
          type: data.type
        }
      })
    })
  })
});

export const { useAddUserAnswersMutation } = userAnswerApi;
