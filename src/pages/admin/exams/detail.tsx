import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Flex, Group, Loader, Tabs, Title } from '@mantine/core';
import QuestionAddListPart3 from 'components/Question/QuestionAddListPart3';
import QuestionAddListPart6 from 'components/Question/QuestionAddListPart6';
import QuestionAddListPart7 from 'components/Question/QuestionAddListPart7';
import QuestionAddPart1 from 'components/Question/QuestionAddPart1';
import QuestionAddPart2 from 'components/Question/QuestionAddPart2';
import QuestionAddPart5 from 'components/Question/QuestionAddPart5';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetGroupQuestionsQuery } from 'store/services/groupQuestionApi';
import { useGetQuestionsQuery } from 'store/services/questionApi';
import { GroupQuestionProps, Question } from 'types';
import { getGroupQuestions, getQuestions } from 'utils/parse.util';

const ExamDetail = () => {
  const [activeTab, setActiveTab] = useState<string | null>('1');
  const param = useParams();
  const navigate = useNavigate();

  const { data: listQuestion } = useGetQuestionsQuery({
    id: param.id,
    type: 'fulltest',
    part: ['1', '2', '5', '6']
  });

  const { data: listGroupQuestions } = useGetGroupQuestionsQuery({
    id: param.id,
    type: 'fulltest',
    part: ['3', '4', '7']
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [groupQuestions, setGroupQuestions] = useState<GroupQuestionProps[]>([]);

  useEffect(() => {
    if (listQuestion) {
      setQuestions(listQuestion.data.questions);
    }
    if (listGroupQuestions) {
      setGroupQuestions(listGroupQuestions.data.group_questions);
    }
  }, [listQuestion, listGroupQuestions]);

  return (
    <Box>
      <Group justify="space-between">
        <Title order={2}>Test:</Title>
        <Button
          variant="light"
          leftSection={<FontAwesomeIcon icon={faArrowLeft} />}
          onClick={() => navigate(-1)}>
          Go back
        </Button>
      </Group>
      <Box>
        <Tabs value={activeTab} onChange={setActiveTab} radius="lg" color="teal" mt="xl">
          <Tabs.List className="border-b-0 font-semibold" my={16}>
            {['1', '2', '3', '4', '5', '6', '7'].map((part) => (
              <Tabs.Tab value={part} color="blue">
                Part {part}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {['1', '2', '3', '4', '5', '6', '7'].map((part) => {
            if (part === '1') {
              return (
                <Tabs.Panel value="1" pt="xs">
                  {getQuestions(1, questions).length > 0 ? (
                    getQuestions(1, questions).map((question) => (
                      <QuestionAddPart1 question={question} />
                    ))
                  ) : (
                    <Flex w="100%" h={600} align="center" justify="center">
                      <Loader size={30} ta="center" />
                    </Flex>
                  )}
                </Tabs.Panel>
              );
            } else if (part === '2') {
              return (
                <Tabs.Panel value="2" pt="xs">
                  {getQuestions(2, questions).length > 0 ? (
                    getQuestions(2, questions).map((question) => (
                      <QuestionAddPart2 question={question} />
                    ))
                  ) : (
                    <Flex w="100%" h={600} align="center" justify="center">
                      <Loader size={30} ta="center" />
                    </Flex>
                  )}
                </Tabs.Panel>
              );
            } else if (part === '3') {
              return (
                <Tabs.Panel value="3" pt="xs">
                  {groupQuestions.length > 0 ? (
                    <QuestionAddListPart3 groupQuestions={getGroupQuestions(3, groupQuestions)} />
                  ) : (
                    <Flex w="100%" h={600} align="center" justify="center">
                      <Loader size={30} ta="center" />
                    </Flex>
                  )}
                </Tabs.Panel>
              );
            } else if (part === '4') {
              return (
                <Tabs.Panel value="4" pt="xs">
                  {groupQuestions.length > 0 ? (
                    <QuestionAddListPart3 groupQuestions={getGroupQuestions(4, groupQuestions)} />
                  ) : (
                    <Flex w="100%" h={600} align="center" justify="center">
                      <Loader size={30} ta="center" />
                    </Flex>
                  )}
                </Tabs.Panel>
              );
            } else if (part === '5') {
              return (
                <Tabs.Panel value="5" pt="xs">
                  {getQuestions(5, questions).length > 0 ? (
                    getQuestions(5, questions).map((question) => (
                      <QuestionAddPart5 question={question} />
                    ))
                  ) : (
                    <Flex w="100%" h={600} align="center" justify="center">
                      <Loader size={30} ta="center" />
                    </Flex>
                  )}
                </Tabs.Panel>
              );
            } else if (part === '6') {
              return (
                <Tabs.Panel value="6" pt="xs">
                  {groupQuestions.length > 0 ? (
                    <QuestionAddListPart6 groupQuestions={getGroupQuestions(6, groupQuestions)} />
                  ) : (
                    <Flex w="100%" h={600} align="center" justify="center">
                      <Loader size={30} ta="center" />
                    </Flex>
                  )}
                </Tabs.Panel>
              );
            } else if (part === '7') {
              return (
                <Tabs.Panel value="7" pt="xs">
                  {groupQuestions.length > 0 ? (
                    <QuestionAddListPart7 groupQuestions={getGroupQuestions(7, groupQuestions)} />
                  ) : (
                    <Flex w="100%" h={600} align="center" justify="center">
                      <Loader size={30} ta="center" />
                    </Flex>
                  )}
                </Tabs.Panel>
              );
            }
          })}
        </Tabs>
      </Box>
    </Box>
  );
};

export default ExamDetail;
