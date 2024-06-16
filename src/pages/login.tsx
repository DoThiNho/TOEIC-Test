import { Paper } from '@mantine/core';
import FormSignIn from 'components/Form/FormSignIn';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { localStorageClient } from 'utils/localStorage.util';

const SignIn = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorageClient.getItem('token');
    const isAdmin = localStorageClient.getItem('isAdmin');
    if (token) {
      if (isAdmin) {
        navigate('/admin/users');
      } else navigate('/');
    }
  }, []);
  return (
    <>
      <Paper w={{ md: 500, lg: 500, sm: 500, s: 300 }} shadow="md" p="xl" mx="auto" mt={80}>
        <FormSignIn />
      </Paper>
    </>
  );
};

export default SignIn;
