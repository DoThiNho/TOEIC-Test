import { Button, Container, Flex, Grid, GridCol, Paper, Title } from '@mantine/core';
import CommonHeader from 'components/Common/CommonHeader';
import QuestionPart from 'components/Question/QuestionPart';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useGetQuestionsQuery } from 'store/services/questionApi';
import { Question } from 'types';

const TestQuestions = () => {
  const param = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedParts = searchParams.getAll('part');
  const { data } = useGetQuestionsQuery({
    id: param.id,
    type: param.type,
    part: selectedParts
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (data?.data) {
      const questionsCopy = [...data.data];
      const sortedQuestions = questionsCopy.sort((a, b) => {
        const partNumA = parseInt(a.part_num);
        const partNumB = parseInt(b.part_num);
        return partNumA - partNumB;
      });
      setQuestions(sortedQuestions);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      <CommonHeader />
      <Container size="xxl" px="xl" pt={130} pb={32}>
        <Title order={2} ta="center" mb={64}>
          Practice Set TOEIC 2022 Test 1
        </Title>
        <Grid>
          <GridCol span={8}>
            <Paper shadow="lg" p={16}>
              {questions.map((question, index) => (
                <QuestionPart order={index + 1} question={question} />
              ))}
            </Paper>
          </GridCol>
          <GridCol span={4}>
            <Paper shadow="lg" p={16}>
              <Title order={3} ta="center" mb={16}>
                Time
                <br />
                {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
              </Title>
              <Flex wrap="wrap" gap={8}>
                {questions.map((_, index) => (
                  <Button key={index} variant="outline">
                    {index + 1}
                  </Button>
                ))}
              </Flex>
            </Paper>
          </GridCol>
        </Grid>
      </Container>
    </>
  );
};

export default TestQuestions;
