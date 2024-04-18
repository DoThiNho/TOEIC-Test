import { Paper } from '@mantine/core';
import CommonHeader from 'components/common/CommonHeader';
import FormSignIn from 'components/form/FormSignIn';

const SignIn = () => {
  return (
    <>
      <CommonHeader />
      <Paper
        w={{ base: 350, sm: 500, lg: 500 }}
        shadow="md"
        p="xl"
        mx="auto"
        style={{ transform: 'translateY(80%)' }}>
        <FormSignIn />
      </Paper>
    </>
  );
};

export default SignIn;
