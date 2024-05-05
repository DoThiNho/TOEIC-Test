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

export interface User {
  id?: string;
  roleId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  token?: string;
  image?: string;
  registerAt?: string;
}

export interface IAuthState {
  token?: string | null;
}

export interface IUserState {
  user?: User;
}
