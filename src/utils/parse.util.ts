import { toast } from 'react-hot-toast';

export const showMessage = (message: string, isSuccess: boolean) => {
  if (isSuccess) {
    toast.success(message, {
      position: 'top-center'
    });
  } else {
    toast.error(message, {
      position: 'top-center'
    });
  }
};
