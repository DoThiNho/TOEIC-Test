import { Avatar, Box, Container } from '@mantine/core';
import avatar from 'assets/images/avatar.jpg';
import FormProfile from 'components/Form/FormProfile';

const CommonProfile = () => {
  return (
    <Container size="xl" className="h-screen flex justify-center items-center">
      <Box w="50%">
        <Box>
          <Avatar src={avatar} size={200} alt="it's me" mx="auto" />
        </Box>
        <FormProfile />
      </Box>
    </Container>
  );
};

export default CommonProfile;
