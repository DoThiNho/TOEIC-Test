export interface TableData {
  id: number;
  userId: number;
  testId: number;
  type: string;
  date: string;
  totalCorrect: number;
  totalQuestion: number;
  time: string;
}

export interface Exam {
  id?: string;
  title?: string;
}

export interface ExamCardProps {
  exam: Exam;
}

export interface ExamListCardProps {
  exams: Exam[];
}

export interface User {
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
