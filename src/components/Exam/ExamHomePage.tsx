import { Anchor, Box, Button, Container, Title } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ExamList from 'components/Exam/ExamList';
import { useEffect, useState } from 'react';
import { useGetTestsQuery } from 'store/services/testApi';

const ExamHome = () => {
  const [tests, setTests] = useState([]);
  const { data } = useGetTestsQuery({ limit: 6 });

  useEffect(() => {
    if (data) {
      setTests(data.tests);
    }
  }, [data]);

  return (
    <Container size="xl" mt={64}>
      <Box>
        <Title order={1} ta="center" mb={32}>
          Exams
        </Title>
        <Anchor td="none" href="/tests">
          <Button
            leftSection={<FontAwesomeIcon icon={faArrowRight} />}
            variant="light"
            className="float-right">
            View All
          </Button>
        </Anchor>
        <ExamList exams={tests} />
      </Box>
    </Container>
  );
};

export default ExamHome;
