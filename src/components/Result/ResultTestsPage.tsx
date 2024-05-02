import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Anchor, Box, Button, Container, Title } from '@mantine/core';
import ResultList from './ResultList';

const ResultTestsPage = () => {
  return (
    <Box my={90} py={64} bg="blue.0">
      <Container size="xl">
        <Box>
          <Title order={3} mb={16}>
            Result Exams
          </Title>
          <ResultList />
          <Anchor td="none" href="/results">
            <Button leftSection={<FontAwesomeIcon icon={faArrowRight} />} variant="light" mt={32}>
              View All
            </Button>
          </Anchor>
        </Box>
      </Container>
    </Box>
  );
};

export default ResultTestsPage;
