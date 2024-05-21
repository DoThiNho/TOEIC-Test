import { Box, CheckIcon, Grid, GridCol, Group, Radio, RadioGroup, Title } from '@mantine/core';
import { ChangeEvent } from 'react';
import { QuestionProps } from 'types';
import { getAudioUrl, getImageUrl } from 'utils/parse.util';

const QuestionPart1 = (props: QuestionProps) => {
  const { question, updateQuestion, isDisable, isShowAnswer } = props;

  const getRadioStyle = (option: string) => {
    const isChecked = isShowAnswer && question.correct_answer === option;
    return {
      color: isChecked ? 'green' : 'inherit',
      fontWeight: isChecked ? 'bold' : 'normal'
    };
  };

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestion = {
      ...question,
      user_answer: { questionId: question.id, option: e.target.value }
    };
    updateQuestion(updatedQuestion);
  };

  const getLabel = (option: string) => {
    const textAnswer = `answer_${option}`;
    return isShowAnswer
      ? `${option.toLocaleUpperCase()} . ${question[textAnswer]}`
      : `${option.toLocaleUpperCase()} .`;
  };

  const options = ['a', 'b', 'c', 'd'];

  return (
    <Group mb={64} gap={64} onChange={handleOptionChange} w={isShowAnswer ? '80%' : '100%'}>
      <Grid w="100%">
        <GridCol span={{ base: 12, md: 6, lg: 6 }}>
          <img
            width="100%"
            height="100%"
            className="mb-4"
            src={getImageUrl(question.image)}
            alt="image question"
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 6, lg: 6 }} className="flex flex-col justify-center">
          <Box w="100%">
            <audio controls className="w-full">
              <source src={getAudioUrl(question.audio)} type="audio/mpeg" />
            </audio>
          </Box>
          <Group mt={32}>
            <Title order={4}>{`${question.order}. `}</Title>
            <RadioGroup
              variant="vertical"
              required
              value={isShowAnswer ? question.correct_answer : ''}>
              {options.map((option: string) => (
                <Radio
                  key={option}
                  icon={CheckIcon}
                  disabled={isDisable && question.correct_answer !== option}
                  value={option}
                  label={getLabel(option)}
                  mb={8}
                  style={getRadioStyle(option)}
                  size="md"
                />
              ))}
            </RadioGroup>
          </Group>
        </GridCol>
      </Grid>
    </Group>
  );
};

export default QuestionPart1;
