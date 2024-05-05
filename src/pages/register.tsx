import { Paper } from '@mantine/core';
import CommonHeader from 'components/Common/CommonHeader';
import FormSignUp from 'components/Form/FormSignUp';

const Register = () => {
  return (
    <>
      <CommonHeader />
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
