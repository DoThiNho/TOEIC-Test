import { Box, Button, Container, Divider, Group, Paper, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CommonHeader from 'components/Common/CommonHeader';
import ModalConfirm from 'components/Modal/ModalConfirmExit';
import QuestionPart from 'components/Question/QuestionPart';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetQuestionsQuery } from 'store/services/questionApi';
import { Question } from 'types';

const ResultPart = () => {
  const navigate = useNavigate();

  const { testId, partId } = useParams();
  const { data: listQuestion } = useGetQuestionsQuery({
    id: testId,
    type: '',
    part: [partId]
  });

  const [openedModalExit, { open: openModalExit, close: closeModalExit }] = useDisclosure(false);
  const [isShowAudio, setIsShowAudio] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [images, setImages] = useState<string[]>([]);

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

  const handleConfirmExit = () => {
    navigate(`/tests/${testId}`);
  };

  return (
    <>
      <CommonHeader />
      <Container size="xxl" px="xl" pt={130} pb={32}>
        <Title order={2} ta="center" mb={16}>
          Answer / Transcript : Part {listQuestion?.data.questions[0].part_num}
        </Title>
        <Group justify="center" align="center" mb={64}>
          <Title order={2} ta="center">
            {listQuestion?.data.book_title} {listQuestion?.data.test_title}
          </Title>
          <Button variant="outline" onClick={openModalExit}>
            Exit
          </Button>
        </Group>
        <Paper shadow="lg" p={16}>
          {isShowAudio && (
            <Box>
              <audio controls className="w-full mb-8">
                {listQuestion && (
                  <source src={`/src/assets/${listQuestion.data.audio_link}`} type="audio/mpeg" />
                )}
              </audio>
            </Box>
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
                        updateQuestion={() => {}}
                        isDisable={true}
                        isShowAnswer={true}
                      />
                    ))}
                </Box>
              </Group>
              <Divider my="md" />
            </>
          ))}
        </Paper>
      </Container>
      <ModalConfirm
        text="Do you sure you want to exit? "
        open={openedModalExit}
        onClose={closeModalExit}
        handleConfirm={handleConfirmExit}
      />
    </>
  );
};

export default ResultPart;
