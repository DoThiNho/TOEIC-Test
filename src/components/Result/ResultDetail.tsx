import { Box, Tabs } from '@mantine/core';
import QuestionListPart3 from 'components/Question/QuestionListPart3';
import QuestionListPart6 from 'components/Question/QuestionListPart6';
import QuestionListPart7 from 'components/Question/QuestionListPart7';
import QuestionPart1 from 'components/Question/QuestionPart1';
import QuestionPart2 from 'components/Question/QuestionPart2';
import QuestionPart5 from 'components/Question/QuestionPart5';
import { useEffect, useState } from 'react';
import { GroupQuestionProps, Question, ResultDetailProps } from 'types';

const ResultDetail = (props: ResultDetailProps) => {
  const { items } = props;
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [groupQuestions, setGroupQuestions] = useState<GroupQuestionProps[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(selectedParts[0]);

  useEffect(() => {
    if (items && items.results) {
      const result = items.results;
      if (result.parts) {
        const parts = result.parts.split(',');
        setSelectedParts(parts);
      }
    }
  }, []);

  useEffect(() => {
    setQuestions(items.questions);
    setGroupQuestions(items.groupQuestions);
  }, []);

  const getQuestions = (partNum: string) => {
    const listQuestion = questions
      .filter((question) => question.part_num === partNum)
      .sort((a, b) => a.order - b.order);
    return listQuestion;
  };

  const getGroupQuestions = (partNum: string) => {
    const listGroupQuestion = groupQuestions.filter(
      (groupQuestion) => groupQuestion.part_num === partNum
    );
    return listGroupQuestion;
  };

  return (
    <Box p={16}>
      <Tabs
        value={activeTab || selectedParts[0]}
        onChange={setActiveTab}
        radius="lg"
        color="teal"
        mt="xl">
        <Tabs.List className="border-b-0 font-semibold" my={16}>
          {selectedParts.map((part) => (
            <Tabs.Tab value={part} color="blue">
              Part {part}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {selectedParts.map((part) => {
          if (part === '1') {
            return (
              <Tabs.Panel value="1" pt="xs">
                {getQuestions('1').map((question) => (
                  <QuestionPart1
                    question={question}
                    updateQuestion={() => {}}
                    isDisable={true}
                    isShowAnswer={true}
                    optionUser={question.user_answer?.option}
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
                    updateQuestion={() => {}}
                    isDisable={true}
                    isShowAnswer={true}
                    optionUser={question.user_answer?.option}
                  />
                ))}
              </Tabs.Panel>
            );
          } else if (part === '3') {
            return (
              <Tabs.Panel value="3" pt="xs">
                <QuestionListPart3
                  groupQuestions={getGroupQuestions('3')}
                  isDisable={true}
                  isShowAnswer={true}
                  updateQuestion={() => {}}
                />
              </Tabs.Panel>
            );
          } else if (part === '4') {
            return (
              <Tabs.Panel value="4" pt="xs">
                <QuestionListPart3
                  groupQuestions={getGroupQuestions('4')}
                  isDisable={true}
                  isShowAnswer={true}
                  updateQuestion={() => {}}
                />
              </Tabs.Panel>
            );
          } else if (part === '5') {
            return (
              <Tabs.Panel value="5" pt="xs">
                {getQuestions('5').map((question) => (
                  <QuestionPart5
                    question={question}
                    updateQuestion={() => {}}
                    isDisable={true}
                    isShowAnswer={true}
                    optionUser={question.user_answer?.option}
                  />
                ))}
              </Tabs.Panel>
            );
          } else if (part === '6') {
            return (
              <Tabs.Panel value="6" pt="xs">
                <QuestionListPart6
                  groupQuestions={getGroupQuestions('6')}
                  isDisable={true}
                  isShowAnswer={true}
                  updateQuestion={() => {}}
                />
              </Tabs.Panel>
            );
          } else {
            return (
              <Tabs.Panel value="7" pt="xs">
                <QuestionListPart7
                  groupQuestions={getGroupQuestions('7')}
                  isDisable={true}
                  isShowAnswer={true}
                  updateQuestion={() => {}}
                />
              </Tabs.Panel>
            );
          }
        })}
      </Tabs>
    </Box>
  );
};

export default ResultDetail;
