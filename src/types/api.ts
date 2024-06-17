import { User } from 'types';

export interface SuccessResponse<T> {
  status: number;
  message: string;
  data?: T;
}

export interface ErrorResponse {
  status: number;
  data: {
    message: string;
  };
}

export type AuthResponse = {
  message: string;
  token: string;
  user: User;
};
