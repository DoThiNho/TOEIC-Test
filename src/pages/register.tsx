import { Paper } from '@mantine/core';
import FormSignUp from 'components/form/FormSignUp';

const Register = () => {
  return (
    <Paper w={{ base: 300, sm: 500, lg: 500 }} shadow="sm" p="xl" mx="auto">
      <FormSignUp />
    </Paper>
  );
};

export default Register;
