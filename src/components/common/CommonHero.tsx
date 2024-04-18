import { Box, Button, Flex, Text, Title } from '@mantine/core';
import home from 'assets/images/home.png';

const CommonHero = () => {
  return (
    <Box className="h-screen flex items-center" bg="blue.0" px={100}>
      <Box display={{ base: 'block', md: 'flex', lg: 'flex' }}>
        <Flex w={{ md: '50%', lg: '50%' }} align="center">
          <Box>
            <Title order={1} size="3rem">
              Welcome to TOEIC Test
            </Title>
            <Text size="xl" my={32}>
              Prepare for the TOEIC exam effectively and for free with our comprehensive resources.
              Access practice tests and vocabulary exercises to enhance your skills and confidence.
              Start preparing for your TOEIC exam with us today!
            </Text>
            <Button size="xl" mt={16}>
              Start
            </Button>
          </Box>
        </Flex>
        <Box w={{ md: '50%', lg: '50%' }}>
          <img src={home} alt="image error" width="100%" />
        </Box>
      </Box>
    </Box>
  );
};

export default CommonHero;
