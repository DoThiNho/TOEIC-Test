import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const vocabularyApi = createApi({
  reducerPath: 'vocabularyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/'
  }),
  tagTypes: ['GroupVocabulary', 'Vocabulary'],

  endpoints: (build) => ({
    getGroupVocabularies: build.query({
      query: () => 'api/vocabularies',
      providesTags: ['GroupVocabulary']
    }),
    getVocabulariesByGroupId: build.query({
      query: (groupId) => {
        return `api/vocabularies/${groupId}`;
      },
      providesTags: ['Vocabulary']
    }),
    addVocabularies: build.mutation({
      query: (data) => ({
        url: 'api/vocabularies',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Vocabulary']
    }),
    addGroupVocabulary: build.mutation({
      query: (data) => ({
        url: 'api/vocabularies/group-vocabulary',
        method: 'POST',
        body: {
          vocabularies: data.vocabularies,
          user_id: data.user_id,
          title: data.title,
          description: data.description
        }
      }),
      invalidatesTags: ['GroupVocabulary']
    })
  })
});

export const {
  useGetGroupVocabulariesQuery,
  useGetVocabulariesByGroupIdQuery,
  useAddVocabulariesMutation,
  useAddGroupVocabularyMutation
} = vocabularyApi;
