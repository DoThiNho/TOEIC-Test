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
}

export interface Exam {
  id: string;
  title: string;
  book_id: string;
  book_title: string;
  file_id: string;
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
}

export interface UserAnswer {
  questionId: string;
  option: string;
}

export interface QuestionProps {
  question: Question;
  order: number;
  isDisable: boolean;
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
