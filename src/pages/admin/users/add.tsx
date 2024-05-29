import { Box, Group } from '@mantine/core';
import FormSignUp from 'components/Form/FormSignUp';

const UserAdd = () => {
  return (
    <Group justify="center">
      <Box w="30%">
        <FormSignUp />
      </Box>
    </Group>
  );
};

export default UserAdd;
