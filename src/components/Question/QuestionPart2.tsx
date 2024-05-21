import { Box, CheckIcon, Group, Radio, RadioGroup, Title } from '@mantine/core';
import { ChangeEvent } from 'react';
import { QuestionProps } from 'types';
import { getAudioUrl } from 'utils/parse.util';

const QuestionPart2 = (props: QuestionProps) => {
  const { question, updateQuestion, isDisable, isShowAnswer } = props;

  const getRadioStyle = (option: string) => {
    const isChecked = isShowAnswer && question.correct_answer === option;
    return {
      color: isChecked ? 'green' : 'inherit',
      fontWeight: isChecked ? 'bold' : 'normal'
    };
  };

  const getLabel = (option: string) => {
    const textAnswer = `answer_${option}`;
    return isShowAnswer
      ? `${option.toLocaleUpperCase()} . ${question[textAnswer]}`
      : `${option.toLocaleUpperCase()} .`;
  };

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestion = {
      ...question,
      user_answer: { questionId: question.id, option: e.target.value }
    };
    updateQuestion(updatedQuestion);
  };

  const options = ['a', 'b', 'c'];

  return (
    <Box mt={64} onChange={handleOptionChange}>
      <audio controls className="w-full">
        <source src={getAudioUrl(question.audio)} type="audio/mpeg" />
      </audio>
      <Group align="center" mt={32}>
        <Title order={4}>{`${question.order}. `}</Title>
        <RadioGroup variant="vertical" required value={isShowAnswer ? question.correct_answer : ''}>
          {options.map((option: string) => (
            <Radio
              key={option}
              icon={CheckIcon}
              disabled={isDisable && question.correct_answer !== option}
              value={option}
              label={getLabel(option)}
              mb={8}
              style={getRadioStyle(option)}
              size="lg"
            />
          ))}
        </RadioGroup>
      </Group>
    </Box>
  );
};

export default QuestionPart2;
