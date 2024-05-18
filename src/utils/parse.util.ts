import { toast } from 'react-toastify';

export const showMessage = (message: string, isSuccess: boolean) => {
  if (isSuccess) {
    toast.success(message);
  } else {
    toast.error(message);
  }
};
