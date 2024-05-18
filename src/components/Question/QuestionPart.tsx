import React, { ChangeEvent } from 'react';
import { Box, CheckIcon, Group, Radio, RadioGroup, Title } from '@mantine/core';
import { QuestionProps } from 'types';

type AnswerKey = 'answer_a' | 'answer_b' | 'answer_c' | 'answer_d';

const QuestionPart: React.FC<QuestionProps> = ({
  question,
  updateQuestion,
  isDisable,
  isShowAnswer,
  optionUser
}) => {
  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestion = {
      ...question,
      user_answer: { questionId: question.id, option: e.target.value }
    };
    updateQuestion(updatedQuestion);
  };

  const getRadioStyle = (option: string) => {
    const isChecked = isShowAnswer ? question.correct_answer === option : optionUser === option;
    return {
      color: isChecked ? 'green' : 'inherit',
      fontWeight: isChecked ? 'bold' : 'normal'
    };
  };

  const options = ['a', 'b', 'c', 'd'] as const;

  return (
    <Box mb={64} onChange={handleOptionChange}>
      <Group align="center" mb={8}>
        <Title order={4}>{`${question.order}. ${question.question_title}`}</Title>
      </Group>
      <RadioGroup
        variant="vertical"
        required
        value={isShowAnswer ? question.correct_answer : optionUser}>
        {options.map((option) => {
          const answerKey: AnswerKey = `answer_${option}` as AnswerKey;
          if (option === 'd' && !question.answer_d) return null;
          return (
            <Radio
              key={option}
              icon={CheckIcon}
              disabled={isDisable && question.correct_answer !== option}
              value={option}
              label={question[answerKey]}
              mb={8}
              style={getRadioStyle(option)}
            />
          );
        })}
      </RadioGroup>
    </Box>
  );
};

export default QuestionPart;
