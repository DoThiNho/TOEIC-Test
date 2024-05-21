import { API_URL } from 'constants/constant';
import { toast } from 'react-toastify';
import { Question, UserAnswer } from 'types';

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
