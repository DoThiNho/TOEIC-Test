import { Box, Button, Container, Flex, Text, Title } from '@mantine/core';
import home from 'assets/images/home.png';

const CommonHero = () => {
  return (
    <Container size="xl">
      <Box display={{ base: 'block', md: 'flex', lg: 'flex' }}>
        <Flex w={{ md: '50%', lg: '50%' }} align="center">
          <Box>
            <Title order={1} size="3rem">
              Welcome to TOEIC Test
            </Title>
            <Text size="lg" my={32}>
              Prepare for the TOEIC exam effectively and for free with our comprehensive resources.
              Access practice tests and vocabulary exercises to enhance your skills and confidence.
              Start preparing for your TOEIC exam with us today!
            </Text>
            <Button size="md" mt={16}>
              Start
            </Button>
          </Box>
        </Flex>
        <Box w={{ md: '50%', lg: '50%' }}>
          <img src={home} alt="image error" width="100%" />
        </Box>
      </Box>
    </Container>
  );
};

export default CommonHero;
