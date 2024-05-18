import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridCol,
  Group,
  Paper,
  Title
} from '@mantine/core';
import CommonHeader from 'components/Common/CommonHeader';
import QuestionPart from 'components/Question/QuestionPart';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetQuestionsQuery } from 'store/services/questionApi';
import { Question } from 'types';
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
  const { data: listGroupVocabulary } = useGetGroupVocabulariesQuery({});

  const { userDetail } = useAppSelector((state: RootState) => state.user);
  const [addUserAnswers, { data }] = useAddUserAnswersMutation();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [words, setWords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [openedModalExit, { open: openModalExit, close: closeModalExit }] = useDisclosure(false);
  const [openedModalSubmit, { open: openModalSubmit, close: closeModalSubmit }] =
    useDisclosure(false);
  const [
    openedModalAddVocabulary,
    { open: openModalAddVocabulary, close: closeModalAddVocabulary }
  ] = useDisclosure(false);

  const [images, setImages] = useState<string[]>([]);
  const [isShowAudio, setIsShowAudio] = useState(true);
  const [title, setTitle] = useState('');
  const [selectedText, setSelectedText] = useState('');

  const [position, setPosition] = useState({ top: 0, left: 0, visible: false });

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
      const sortedQuestions = questionsCopy.sort((a, b) => {
        const partNumA = parseInt(a.part_num, 10);
        const partNumB = parseInt(b.part_num, 10);
        return partNumA - partNumB;
      });
      const updatedQuestions = sortedQuestions.map((question) => ({
        ...question,
        user_answer: { questionId: question.id, option: '' }
      }));
      const images = updatedQuestions.map((question) => question.image);
      const uniqueImages = [...new Set(images)];
      const isShowAudio = updatedQuestions.some((question) => {
        return ['1', '2', '3', '4'].includes(question.part_num);
      });
      setIsShowAudio(isShowAudio);
      setImages(uniqueImages);
      setQuestions(updatedQuestions);
    }
  }, [listQuestion, setQuestions]);

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

  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    );
  };

  const handleSubmit = async () => {
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    const answers = questions.map((question) => question.user_answer);
    const currentDate = moment().format('YYYY-MM-DD');
    const totalCorrect = questions.reduce((total, item) => {
      if (item.correct_answer === item.user_answer?.option) {
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
      totalQuestions: questions.length,
      type: param.type,
      title
    };
    await addUserAnswers(results);

    if (data?.status === 200) {
      navigate(`/tests/${param.id}/results/${data.data.id}`);
    }
  };

  const handleConfirmExit = () => {
    navigate(`/tests/${param.id}`);
  };

  return (
    <>
      <CommonHeader />
      <Container size="xxl" px="xl" pt={130} pb={32}>
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
              {isShowAudio && (
                <Box>
                  <audio controls className="w-full mb-8">
                    {testDetail && (
                      <source src={`/src/assets/${testDetail.data.audio_link}`} type="audio/mpeg" />
                    )}
                  </audio>
                </Box>
              )}
              {position.visible && (
                <Button
                  style={{
                    position: 'absolute',
                    top: position.top - 270,
                    left: position.left - 30,
                    boxShadow: '0 0 5px rgba(0,0,0,0.3)'
                  }}
                  onClick={openModalAddVocabulary}
                  variant="variant"
                  color="blue">
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              )}
              {images.map((image: string, index) => (
                <>
                  <Group key={index} className="flex-nowrap">
                    <Box>
                      {image.split(',').map((img) => (
                        <img className="mb-4" src={img} alt="image question" />
                      ))}
                    </Box>
                    <Box>
                      {questions
                        .filter((question) => question.image.includes(image))
                        .map((question, index) => (
                          <QuestionPart
                            order={index + 1}
                            question={question}
                            updateQuestion={updateQuestion}
                            isDisable={timeLimit ? (timeLeft === 0 ? true : false) : false}
                          />
                        ))}
                    </Box>
                  </Group>
                  <Divider my="md" />
                </>
              ))}
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
              <Flex wrap="wrap" gap={8}>
                {questions.map((question, index) => (
                  <Button
                    key={index}
                    variant={question.user_answer?.option === '' ? 'outline' : 'filled'}>
                    {index + 1}
                  </Button>
                ))}
              </Flex>
            </Paper>
          </GridCol>
        </Grid>
      </Container>
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
