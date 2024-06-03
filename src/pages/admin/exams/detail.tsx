import { Box, Group, Tabs, Title } from '@mantine/core';
import QuestionAddListPart3 from 'components/Question/QuestionAddListPart3';
import QuestionAddListPart6 from 'components/Question/QuestionAddListPart6';
import QuestionAddListPart7 from 'components/Question/QuestionAddListPart7';
import QuestionAddPart1 from 'components/Question/QuestionAddPart1';
import QuestionAddPart2 from 'components/Question/QuestionAddPart2';
import QuestionAddPart5 from 'components/Question/QuestionAddPart5';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetGroupQuestionsQuery } from 'store/services/groupQuestionApi';
import { useGetQuestionsQuery } from 'store/services/questionApi';
import { GroupQuestionProps, Question } from 'types';

const ExamDetail = () => {
  const [activeTab, setActiveTab] = useState<string | null>('1');
  const param = useParams();

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

  return (
    <Box>
      <Group justify="space-between">
        <Title order={2}>Test:</Title>
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
                  {getQuestions('1').map((question) => (
                    <QuestionAddPart1 question={question} />
                  ))}
                </Tabs.Panel>
              );
            } else if (part === '2') {
              return (
                <Tabs.Panel value="2" pt="xs">
                  {getQuestions('2').map((question) => (
                    <QuestionAddPart2 question={question} />
                  ))}
                </Tabs.Panel>
              );
            } else if (part === '3') {
              return (
                <Tabs.Panel value="3" pt="xs">
                  <QuestionAddListPart3 groupQuestions={getGroupQuestions('3')} />
                </Tabs.Panel>
              );
            } else if (part === '4') {
              return (
                <Tabs.Panel value="4" pt="xs">
                  <QuestionAddListPart3 groupQuestions={getGroupQuestions('4')} />
                </Tabs.Panel>
              );
            } else if (part === '5') {
              return (
                <Tabs.Panel value="5" pt="xs">
                  {getQuestions('5').map((question) => (
                    <QuestionAddPart5 question={question} />
                  ))}
                </Tabs.Panel>
              );
            } else if (part === '6') {
              return (
                <Tabs.Panel value="6" pt="xs">
                  <QuestionAddListPart6 groupQuestions={getGroupQuestions('6')} />
                </Tabs.Panel>
              );
            } else if (part === '7') {
              return (
                <Tabs.Panel value="7" pt="xs">
                  <QuestionAddListPart7 groupQuestions={getGroupQuestions('7')} />
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
