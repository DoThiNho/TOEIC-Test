import { Paper } from '@mantine/core';
import CommonHeader from 'components/common/CommonHeader';
import FormSignUp from 'components/form/FormSignUp';

const Register = () => {
  return (
    <>
      <CommonHeader />
      <Paper
        w={{ base: 300, sm: 500, lg: 500 }}
        shadow="md"
        p="xl"
        mx="auto"
        style={{ transform: 'translateY(20%)' }}>
        <FormSignUp />
      </Paper>
    </>
  );
};

export default Register;
