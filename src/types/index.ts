import { ReactNode } from 'react';

export interface TableData {
  id?: number;
  user_id?: number;
  test_id?: number;
  type?: string;
  date?: string;
  total_correct?: number;
  total_questions?: number;
  complete_time?: string;
  parts?: string;
  title?: string;
  test_title?: string;
  book_title?: string;
}

export interface Exam {
  id: string;
  title: string;
  book_id: string;
  book_title: string;
  file_id: string;
  audio_link?: string;
}

export interface Part {
  id?: string;
  test_id?: string;
  type?: string;
  description?: string;
  part_num?: string;
}

export interface Test {
  id?: string;
  title?: string;
  book_title?: string;
  parts?: Part[];
}

export interface Question {
  id: string;
  test_id: string;
  part_id: string;
  file_id: string;
  question_title: string;
  image: string;
  answer_a: string;
  answer_b: string;
  answer_c: string;
  answer_d: string;
  correct_answer: string;
  part_num: string;
  user_answer?: UserAnswer;
  order: number;
  audio: string;
  [key: string]: any;
}

export interface Answer {
  id: string;
  option: string;
  achievement_id: string;
  question_id: string;
}

export interface UserAnswer {
  questionId: string;
  option: string;
}

export interface QuestionProps {
  question: Question;
  isDisable: boolean;
  isShowAnswer?: boolean;
  updateQuestion: (question: Question) => void;
  optionUser?: string;
}

export interface ExamCardProps {
  exam: Exam;
}

export interface ExamListCardProps {
  exams: Exam[];
}

export interface PartProps {
  items: Part[];
  testId?: string;
}

export interface ResultProps {
  result: TableData;
}

export interface TableResultProps {
  data: TableData[];
}

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  image?: string;
}

export interface IAuthState {
  token?: string | null;
}

export interface IUserState {
  userDetail?: User;
}

export interface ModalConfirmProps {
  text: string;
  open: boolean;
  onClose: () => void;
  handleConfirm: () => void;
}

export interface ModalAddVocabularyProps {
  text: string;
  words: FlashCardProps[];
  open: boolean;
  onClose: () => void;
}

export interface ModalAddProps {
  open: boolean;
  onClose: () => void;
}

export interface ModalWordScrambleProps {
  open: boolean;
  onClose: () => void;
  words: CardVocabulary[];
}

export interface Results {
  test: Exam;
  answers: Answer[];
  questions: Question[];
  groupQuestions: GroupQuestionProps[];
  results: TableData;
}

export interface ResultDetailProps {
  items: Results;
}

export interface FlashCardProps {
  id?: string;
  title?: string;
  description?: string;
  onClick?: () => void;
}

export interface CardVocabulary {
  id: string;
  group_vocabularies_id?: string;
  title: string;
  mean: string;
}

export interface VocabularyAddProps {
  order: number;
  card: CardVocabulary;
  onDelete: (id: string) => void;
  onChange: (id: string, name: string, value: string) => void;
}

export interface FormAddListFlashCardsProps {
  title: string;
  description: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface GroupQuestionProps {
  id: string;
  group_image: string;
  group_audio: string;
  part_id: string;
  part_num: string;
  questions: Question[];
}

export interface QuestionListPartProps {
  questions: Question[];
  isDisable: boolean;
  isShowAnswer: boolean;
}

export interface QuestionListPart34Props {
  groupQuestions: GroupQuestionProps[];
  isDisable: boolean;
  isShowAnswer: boolean;
  updateQuestion: (question: Question) => void;
}

export interface SideBarProps {
  activeLink: string;
}

export interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  image: string;
  password: string;
  phone_number: string;
  register_at: string;
  role_id: string;
}

export interface LayoutProps {
  children: ReactNode;
}
