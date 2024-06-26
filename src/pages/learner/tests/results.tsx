import {
  faArrowLeft,
  faCheck,
  faCircleCheck,
  faCircleXmark,
  faList,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  Paper,
  Text,
  Title
} from '@mantine/core';
import ResultDetail from 'components/Result/ResultDetail';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetResultByIdQuery } from 'store/services/resultApi';
import { GroupQuestionProps, Question, Answer } from 'types';

const ResultExam = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { data: resultDetail } = useGetResultByIdQuery(param.idResult);

  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (resultDetail?.data) {
      const allQuestions = resultDetail.data.groupQuestions.flatMap(
        (groupQuestion: GroupQuestionProps) => groupQuestion.questions
      );
      const combinedQuestions = [...resultDetail.data.questions, ...allQuestions];
      const uniqueQuestions = Array.from(
        new Map(combinedQuestions.map((question) => [question.id, question])).values()
      );
      uniqueQuestions.sort((a, b) => a.order - b.order);

      setQuestions(uniqueQuestions);
    }
  }, [resultDetail]);

  const getUserAnswer = (questionId: string) => {
    const userAnswer = resultDetail.data.answers.find(
      (answer: Answer) => answer.question_id === questionId
    );
    return userAnswer?.option?.trim();
  };

  const isCheckFullTest = () => {
    return (
      resultDetail?.data.results.type === 'fulltest' ||
      resultDetail?.data.results.parts === '1,2,3,4,5,6,7'
    );
  };

  return (
    <>
      <Container size="xxl" px="xl" pt={50} pb={32} mb={150}>
        <Paper w="80%" shadow="lg" p={16} mx="auto">
          {!resultDetail?.data ? (
            <LoadingOverlay
              visible={!resultDetail?.data}
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 2 }}
            />
          ) : (
            <>
              <Button
                variant="light"
                leftSection={<FontAwesomeIcon icon={faArrowLeft} />}
                onClick={() => navigate(`/learner/tests/${resultDetail.data.test.id}`)}>
                Go back
              </Button>
              <Group justify="center">
                <Title order={2} ta="center">
                  {resultDetail && resultDetail.data.test.book_title}
                </Title>
                <Title order={2} ta="center">
                  {resultDetail && resultDetail.data.test.title}
                </Title>
                {resultDetail.data.parts !== '' && (
                  <>
                    {resultDetail.data.results.parts
                      ?.split(',')
                      .map((item: string, index: number) => (
                        <Badge key={index} size="sm" color="yellow">
                          Part {item}
                        </Badge>
                      ))}
                  </>
                )}
              </Group>
              {isCheckFullTest() && (
                <Flex my={32} justify="center">
                  <Title order={3}>
                    Score :{' '}
                    {resultDetail.data.results.score_listening +
                      resultDetail.data.results.score_reading}{' '}
                    / 990
                  </Title>
                </Flex>
              )}
              <Group ta="center" justify="center">
                <Paper shadow="lg" p={48}>
                  <Text c="green">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </Text>
                  <Text c="green">Correct</Text>
                  <Text fw={700}>{resultDetail.data.results.total_corrects}</Text>
                  <Text>Questions</Text>
                </Paper>
                <Paper shadow="lg" p={48}>
                  <Text c="red">
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </Text>
                  <Text c="red">Incorrect</Text>
                  <Text fw={700}>
                    {resultDetail.data.results.total_questions -
                      resultDetail.data.results.total_corrects}
                  </Text>
                  <Text>Questions</Text>
                </Paper>
                <Paper shadow="lg" p={48}>
                  <Text>
                    <FontAwesomeIcon icon={faList} />
                  </Text>
                  <Text>Total</Text>
                  <Text fw={700}>{resultDetail.data.results.total_questions}</Text>
                  <Text>Questions</Text>
                </Paper>
              </Group>
              <Group mt={32}>
                <Text>Answer : </Text>
                <Button variant="outline" onClick={() => setIsShowAnswer(!isShowAnswer)}>
                  See detail answer
                </Button>
              </Group>
              <Box>
                {!isShowAnswer && questions && resultDetail?.data?.answers && (
                  <Group w="50%" justify="space-between" align="start" mt={32}>
                    <Box>
                      {questions.slice(0, questions.length / 2).map((question: Question) => (
                        <Group mb={8} key={question.id}>
                          <Text className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                            {question.order}
                          </Text>
                          <Text className="uppercase">{question.correct_answer} : </Text>
                          {!isEmpty(getUserAnswer(question.id || '')) ? (
                            <Text className="uppercase">{getUserAnswer(question.id || '')}</Text>
                          ) : (
                            <Text>No answer</Text>
                          )}{' '}
                          {question.correct_answer?.trim() === getUserAnswer(question.id || '') ? (
                            <Text c="green">
                              <FontAwesomeIcon icon={faCheck} />
                            </Text>
                          ) : (
                            <Text c="red">
                              <FontAwesomeIcon icon={faXmark} />
                            </Text>
                          )}
                        </Group>
                      ))}
                    </Box>
                    <Box>
                      {questions
                        .slice(questions.length / 2, questions.length)
                        .map((question: Question) => (
                          <Group mb={8}>
                            <Text className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                              {question.order}
                            </Text>
                            <Text className="uppercase">{question.correct_answer} : </Text>
                            {!isEmpty(getUserAnswer(question.id || '')) ? (
                              <Text className="uppercase">{getUserAnswer(question.id || '')}</Text>
                            ) : (
                              <Text>No answer</Text>
                            )}
                            {!isEmpty(getUserAnswer(question.id || '')) &&
                            question.correct_answer?.trim() === getUserAnswer(question.id || '') ? (
                              <Text c="green">
                                <FontAwesomeIcon icon={faCheck} />
                              </Text>
                            ) : (
                              <Text c="red">
                                <FontAwesomeIcon icon={faXmark} />
                              </Text>
                            )}
                          </Group>
                        ))}
                    </Box>
                  </Group>
                )}
              </Box>
              {isShowAnswer && <ResultDetail items={resultDetail?.data} />}
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default ResultExam;
