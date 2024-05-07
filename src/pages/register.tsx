import { Paper } from '@mantine/core';
import FormSignUp from 'components/Form/FormSignUp';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { localStorageClient } from 'utils/localStorage.util';

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorageClient.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);
  return (
    <>
      <Paper
        w={{ md: 500, lg: 500, sm: 500, s: 300 }}
        shadow="md"
        p="xl"
        mx="auto"
        style={{ transform: 'translateY(17%)' }}>
        <FormSignUp />
      </Paper>
    </>
  );
};

export default Register;
