import { Box, CheckIcon, Group, Radio, RadioGroup, Title } from '@mantine/core';
import { ChangeEvent } from 'react';
import { QuestionProps } from 'types';
type AnswerKey = 'answer_a' | 'answer_b' | 'answer_c' | 'answer_d';

const QuestionPart3 = (props: QuestionProps) => {
  const { question, updateQuestion, isDisable, isShowAnswer, optionUser } = props;

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

  const options = ['a', 'b', 'c', 'd'];

  return (
    <Box mt={64} onChange={handleOptionChange}>
      <Group align="center" mt={32}>
        <Title order={4}>{`${question.order}. `}</Title>
        <RadioGroup
          variant="vertical"
          required
          value={isShowAnswer ? question.correct_answer : optionUser}>
          {options.map((option) => {
            const answerKey: AnswerKey = `answer_${option}` as AnswerKey;
            return (
              <Radio
                key={option}
                icon={CheckIcon}
                disabled={isDisable && question.correct_answer !== option}
                value={option}
                label={`${option.toLocaleUpperCase()}. ${question[answerKey]}`}
                mb={8}
                style={getRadioStyle(option)}
                size="md"
              />
            );
          })}
        </RadioGroup>
      </Group>
    </Box>
  );
};

export default QuestionPart3;
