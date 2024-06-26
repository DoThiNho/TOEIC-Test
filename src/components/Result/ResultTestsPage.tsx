import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Anchor, Box, Button, Container, Flex, Loader, Title } from '@mantine/core';
import ResultList from './ResultList';
import { useGetResultsQuery } from 'store/services/resultApi';
import { useEffect, useState } from 'react';

const ResultTestsPage = () => {
  const { data, isLoading } = useGetResultsQuery({ limit: 3 });

  const [results, setResult] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setResult(data.data);
    }
  }, [data]);

  return (
    <Box mb={90} py={64} bg="blue.0">
      <Container size="xl">
        {isLoading ? (
          <Flex justify="center">
            <Loader size={30} ta="center" />
          </Flex>
        ) : (
          <Box>
            <Title order={3} mb={16}>
              Result Exams
            </Title>
            <ResultList data={results} />
            <Anchor td="none" href="/learner/results">
              <Button leftSection={<FontAwesomeIcon icon={faArrowRight} />} variant="light" mt={32}>
                View All
              </Button>
            </Anchor>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ResultTestsPage;
