import { Paper } from '@mantine/core';
import CommonHeader from 'components/Common/CommonHeader';
import FormSignIn from 'components/Form/FormSignIn';

const SignIn = () => {
  return (
    <>
      <CommonHeader />
      <Paper
        w={{ md: 500, lg: 500, sm: 500, s: 300 }}
        shadow="md"
        p="xl"
        mx="auto"
        style={{ transform: 'translateY(50%)' }}>
        <FormSignIn />
      </Paper>
    </>
  );
};

export default SignIn;
