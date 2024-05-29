import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridCol,
  Group,
  Paper,
  Tabs,
  Title
} from '@mantine/core';
import CommonHeader from 'components/Common/CommonHeader';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetQuestionsQuery } from 'store/services/questionApi';
import { GroupQuestionProps, Question } from 'types';
import { useGetTestQuery } from 'store/services/testApi';
import { useAddUserAnswersMutation } from 'store/services/userAnswerApi';
import { useAppSelector, RootState } from 'store/index';
import moment from 'moment';
import { useDisclosure } from '@mantine/hooks';
import ModalConfirm from 'components/Modal/ModalConfirmExit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalAddVocabulary from 'components/Modal/ModalAddVocabulary';
import { useGetGroupVocabulariesQuery } from 'store/services/vocabularyApi';
import { useGetGroupQuestionsQuery } from 'store/services/groupQuestionApi';
import QuestionListPart3 from 'components/Question/QuestionListPart3';
import QuestionPart1 from 'components/Question/QuestionPart1';
import QuestionPart2 from 'components/Question/QuestionPart2';
import QuestionPart5 from 'components/Question/QuestionPart5';
import QuestionListPart6 from 'components/Question/QuestionListPart6';
import QuestionListPart7 from 'components/Question/QuestionListPart7';
import CommonChatBox from 'components/Common/CommonChatBox';

const TestQuestions = () => {
  const navigate = useNavigate();
  const param = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedParts = searchParams.getAll('part');
  const timeLimit = parseInt(searchParams.get('time_limit') || '0', 10);
  const { data: testDetail } = useGetTestQuery(param.id);
  const { data: listQuestion } = useGetQuestionsQuery({
    id: param.id,
    type: param.type,
    part: selectedParts
  });
  const { data: listGroupQuestions } = useGetGroupQuestionsQuery({
    id: param.id,
    type: param.type,
    part: selectedParts
  });
  const { data: listGroupVocabulary } = useGetGroupVocabulariesQuery({});
  const { userDetail } = useAppSelector((state: RootState) => state.user);
  const [addUserAnswers, { data }] = useAddUserAnswersMutation();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [groupQuestions, setGroupQuestions] = useState<GroupQuestionProps[]>([]);
  const [words, setWords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [openedModalExit, { open: openModalExit, close: closeModalExit }] = useDisclosure(false);
  const [openedModalSubmit, { open: openModalSubmit, close: closeModalSubmit }] =
    useDisclosure(false);
  const [
    openedModalAddVocabulary,
    { open: openModalAddVocabulary, close: closeModalAddVocabulary }
  ] = useDisclosure(false);

  const [isShowAudio, setIsShowAudio] = useState(true);
  const [title, setTitle] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [activeTab, setActiveTab] = useState<string | null>(selectedParts[0] || '1');
  const [position, setPosition] = useState({ top: 0, left: 0, visible: false });
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);

  useEffect(() => {
    console.log({ questions, groupQuestions });
    if (questions.length > 0 || groupQuestions.length > 0) {
      const allQuestions = groupQuestions.flatMap(
        (groupQuestion: GroupQuestionProps) => groupQuestion.questions
      );
      const combinedQuestions = [...questions, ...allQuestions].sort((a, b) => a.order - b.order);
      console.log({ combinedQuestions });
      setAllQuestions(combinedQuestions);
    }
  }, [questions, groupQuestions]);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const selectedText = selection.toString();
        if (selectedText) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          setPosition({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            visible: true
          });
          setSelectedText(selectedText);
        } else {
          setPosition({ ...position, visible: false });
        }
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [position]);

  useEffect(() => {
    if (listQuestion?.data.questions) {
      const questionsCopy = [...listQuestion?.data.questions];
      const sortedQuestions = questionsCopy
        .filter((question) => !question.group_id)
        .sort((a, b) => {
          const orderA = parseInt(a.order, 10);
          const orderB = parseInt(b.order, 10);
          return orderA - orderB;
        });
      const updatedQuestions = sortedQuestions.map((question) => ({
        ...question,
        user_answer: { questionId: question.id, option: '' }
      }));
      setIsShowAudio(isShowAudio);
      setQuestions(updatedQuestions);
    }
  }, [listQuestion, setQuestions]);

  useEffect(() => {
    if (listGroupQuestions) {
      const listGroupQuestionsCopy = [...listGroupQuestions.data.group_questions];
      const updatedAndSortedGroupQuestions = addUserAnswerToQuestions(listGroupQuestionsCopy).map(
        (groupQuestion) => ({
          ...groupQuestion,
          questions: groupQuestion.questions.slice().sort((a, b) => a.order - b.order)
        })
      );
      setGroupQuestions(updatedAndSortedGroupQuestions);
    }
  }, [listGroupQuestions]);

  useEffect(() => {
    if (data?.status === 200) {
      navigate(`/learner/tests/${param.id}/results/${data.data.id}`);
    }
  }, [data]);

  useEffect(() => {
    let initialTimeLeft;
    if (param.type === 'fulltest') {
      initialTimeLeft = 120 * 60;
    } else if (param.type === 'practice') {
      initialTimeLeft = timeLimit !== undefined ? timeLimit * 60 : 0;
    }

    setTimeLeft(initialTimeLeft || 0);

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (!timeLimit) {
          return prevTime + 1;
        }
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [param.type, timeLimit]);

  useEffect(() => {
    if (testDetail) {
      setTitle(`${testDetail?.data.book_title} ${testDetail?.data.title}`);
    }
  }, [testDetail]);

  useEffect(() => {
    if (listGroupVocabulary) {
      setWords(listGroupVocabulary.data);
    }
  }, [listGroupVocabulary]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const addUserAnswerToQuestions = (groupQuestions: GroupQuestionProps[]) => {
    return groupQuestions.map((groupQuestion) => ({
      ...groupQuestion,
      questions: groupQuestion.questions.map((question) => ({
        ...question,
        user_answer: {
          questionId: question.id,
          option: ''
        }
      }))
    }));
  };

  const getQuestions = (partNum: string) => {
    const listQuestion = questions.filter((question) => question.part_num === partNum);
    return listQuestion;
  };

  const getGroupQuestions = (partNum: string) => {
    const listGroupQuestion = groupQuestions.filter(
      (groupQuestion) => groupQuestion.part_num === partNum
    );
    return listGroupQuestion;
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    );
  };

  const updateGroupQuestion = (updatedQuestion: Question) => {
    setGroupQuestions((prevGroupQuestions) =>
      prevGroupQuestions.map((groupQuestion) => ({
        ...groupQuestion,
        questions: groupQuestion.questions.map((question) =>
          question.id === updatedQuestion.id ? updatedQuestion : question
        )
      }))
    );
  };

  const handleSubmit = async () => {
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    const allQuestions = groupQuestions.flatMap(
      (groupQuestion: GroupQuestionProps) => groupQuestion.questions
    );
    const combinedQuestions = [...questions, ...allQuestions];
    const answers = combinedQuestions.map((question) => question.user_answer);
    const currentDate = moment().format('YYYY-MM-DD');
    const totalCorrect = combinedQuestions.reduce((total, item) => {
      if (item.correct_answer.trim() === item.user_answer?.option.trim()) {
        return total + 1;
      }
      return total;
    }, 0);

    const results = {
      answers,
      userId: userDetail?.id,
      testId: param.id,
      parts: selectedParts,
      startTime: currentDate,
      completeTime: timeString,
      totalCorrect: totalCorrect,
      totalQuestions: combinedQuestions.length,
      type: param.type,
      title
    };
    await addUserAnswers(results);
  };

  const handleConfirmExit = () => {
    navigate(`/learner/tests/${param.id}`);
  };

  console.log({ allQuestions });

  return (
    <>
      <Container size="xxl" px="xl" pt={50} pb={32}>
        <Group justify="center" align="center" mb={64}>
          <Title order={2} ta="center">
            {title}
          </Title>
          <Button variant="outline" onClick={openModalExit}>
            Exit
          </Button>
        </Group>
        <Grid>
          <GridCol span={9}>
            <Paper className="relative" shadow="lg" p={16}>
              {position.visible && (
                <Button
                  style={{
                    position: 'absolute',
                    top: position.top - 270,
                    left: position.left - 30,
                    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
                    width: 40,
                    padding: 0
                  }}
                  onClick={openModalAddVocabulary}
                  variant="variant"
                  color="blue">
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              )}
              <Box>
                <Tabs value={activeTab} onChange={setActiveTab} radius="lg" color="teal" mt="xl">
                  <Tabs.List className="border-b-0 font-semibold" my={16}>
                    {(param.type === 'fulltest'
                      ? ['1', '2', '3', '4', '5', '6', '7']
                      : selectedParts
                    ).map((part) => (
                      <Tabs.Tab value={part} color="blue">
                        Part {part}
                      </Tabs.Tab>
                    ))}
                  </Tabs.List>

                  {(param.type === 'fulltest'
                    ? ['1', '2', '3', '4', '5', '6', '7']
                    : selectedParts
                  ).map((part) => {
                    if (part === '1') {
                      return (
                        <Tabs.Panel value="1" pt="xs">
                          {getQuestions('1').map((question) => (
                            <QuestionPart1
                              question={question}
                              updateQuestion={updateQuestion}
                              isDisable={timeLimit ? (timeLeft === 0 ? true : false) : false}
                              isShowAnswer={false}
                            />
                          ))}
                        </Tabs.Panel>
                      );
                    } else if (part === '2') {
                      return (
                        <Tabs.Panel value="2" pt="xs">
                          {getQuestions('2').map((question) => (
                            <QuestionPart2
                              question={question}
                              updateQuestion={updateQuestion}
                              isDisable={timeLimit ? (timeLeft === 0 ? true : false) : false}
                              isShowAnswer={false}
                            />
                          ))}
                        </Tabs.Panel>
                      );
                    } else if (part === '3') {
                      return (
                        <Tabs.Panel value="3" pt="xs">
                          <QuestionListPart3
                            groupQuestions={getGroupQuestions('3')}
                            isDisable={false}
                            isShowAnswer={false}
                            updateQuestion={updateGroupQuestion}
                          />
                        </Tabs.Panel>
                      );
                    } else if (part === '4') {
                      return (
                        <Tabs.Panel value="4" pt="xs">
                          <QuestionListPart3
                            groupQuestions={getGroupQuestions('4')}
                            isDisable={false}
                            isShowAnswer={false}
                            updateQuestion={updateGroupQuestion}
                          />
                        </Tabs.Panel>
                      );
                    } else if (part === '5') {
                      return (
                        <Tabs.Panel value="5" pt="xs">
                          {getQuestions('5').map((question) => (
                            <QuestionPart5
                              question={question}
                              updateQuestion={updateQuestion}
                              isDisable={timeLimit ? (timeLeft === 0 ? true : false) : false}
                              isShowAnswer={false}
                            />
                          ))}
                        </Tabs.Panel>
                      );
                    } else if (part === '6') {
                      return (
                        <Tabs.Panel value="6" pt="xs">
                          <QuestionListPart6
                            groupQuestions={getGroupQuestions('6')}
                            isDisable={false}
                            isShowAnswer={false}
                            updateQuestion={updateGroupQuestion}
                          />
                        </Tabs.Panel>
                      );
                    } else {
                      return (
                        <Tabs.Panel value="7" pt="xs">
                          <QuestionListPart7
                            groupQuestions={getGroupQuestions('7')}
                            isDisable={false}
                            isShowAnswer={false}
                            updateQuestion={updateGroupQuestion}
                          />
                        </Tabs.Panel>
                      );
                    }
                  })}
                </Tabs>
              </Box>
            </Paper>
          </GridCol>
          <GridCol span={3}>
            <Paper shadow="lg" p={16}>
              <Title order={3} ta="center" mb={16}>
                Time
                <br />
                {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
              </Title>
              <Button variant="filled" color="cyan" fullWidth mb={32} onClick={openModalSubmit}>
                Submit
              </Button>
              <Flex wrap="wrap" gap={8} justify="center">
                {allQuestions.map((question) => (
                  <Button
                    p={0}
                    w={50}
                    key={question.id}
                    variant={question.user_answer?.option === '' ? 'outline' : 'filled'}>
                    {question.order}
                  </Button>
                ))}
                {/* {groupQuestions.map((groupQuestion) =>
                  groupQuestion.questions.map((question) => (
                    <Button
                      p={0}
                      w={50}
                      key={question.id}
                      variant={question.user_answer?.option === '' ? 'outline' : 'filled'}>
                      {question.order}
                    </Button>
                  ))
                )} */}
              </Flex>
            </Paper>
          </GridCol>
        </Grid>
      </Container>
      <CommonChatBox />
      <ModalAddVocabulary
        text={selectedText}
        words={words}
        open={openedModalAddVocabulary}
        onClose={closeModalAddVocabulary}
      />
      <ModalConfirm
        text="Do you sure you want to exit? "
        open={openedModalExit}
        onClose={closeModalExit}
        handleConfirm={handleConfirmExit}
      />
      <ModalConfirm
        text="Do you sure you want to submit?"
        open={openedModalSubmit}
        onClose={closeModalSubmit}
        handleConfirm={handleSubmit}
      />
    </>
  );
};

export default TestQuestions;
