import { Paper } from '@mantine/core';
import FormSignIn from 'components/form/FormSignIn';

const SignIn = () => {
  return (
    <Paper w={{ base: 350, sm: 500, lg: 500 }} shadow="sm" p="xl" mx="auto">
      <FormSignIn />
    </Paper>
  );
};

export default SignIn;
