import { API_URL } from 'constants/constant';
import { listeningScoreTable, readingScoreTable } from 'constants/score';
import { toast } from 'react-toastify';
import { GroupQuestionProps, Question, UserAnswer } from 'types';

export const showMessage = (message: string, isSuccess: boolean) => {
  if (isSuccess) {
    toast.success(message);
  } else {
    toast.error(message);
  }
};

export const getImageUrl = (imageName: string) => {
  if (imageName) {
    return `${API_URL}/assets/images/${imageName}`;
  }
  return '';
};

export const getAudioUrl = (audioName: string) => {
  if (audioName) {
    return `${API_URL}/assets/audios/${audioName}`;
  }
  return '';
};

export const getOptions = (question: Question) => {
  if (question.part_num === '2') {
    return [question.answer_a, question.answer_b, question.answer_c];
  } else {
    return [question.answer_a, question.answer_b, question.answer_c, question.answer_d];
  }
};

export const clearSelection = (userAnswer: UserAnswer) => {
  userAnswer.option = '';
};

export const getQuestions = (partNum: number, questions: Question[]) => {
  const listQuestion = questions.filter((question) => parseInt(question.part_num) === partNum);
  return listQuestion;
};

export const getGroupQuestions = (partNum: number, groupQuestions: GroupQuestionProps[]) => {
  const listGroupQuestion = groupQuestions.filter(
    (groupQuestion) => parseInt(groupQuestion.part_num) === partNum
  );
  return listGroupQuestion;
};

export const calculateTOEICScore = (correctListening: number, correctReading: number) => {
  const listeningScore = listeningScoreTable[correctListening];
  const readingScore = readingScoreTable[correctReading];

  return {
    listeningScore: listeningScore || 0,
    readingScore: readingScore || 0
  };
};
