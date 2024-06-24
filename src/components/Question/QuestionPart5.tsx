import { Box, Button, CheckIcon, Checkbox, Group, Radio, RadioGroup, Title } from '@mantine/core';
import { ChangeEvent, useState } from 'react';
import { QuestionProps } from 'types';
type AnswerKey = 'answer_a' | 'answer_b' | 'answer_c' | 'answer_d';

const QuestionPart5 = (props: QuestionProps) => {
  const { question, updateQuestion, isDisable, isShowAnswer, optionUser } = props;
  const [selectedOption, setSelectedOption] = useState(optionUser);

  const options = ['a', 'b', 'c', 'd'];

  const getRadioStyle = (option: string) => {
    const isChecked = isShowAnswer && question.correct_answer === option;
    return {
      color: isChecked ? 'green' : 'inherit',
      fontWeight: isChecked ? 'bold' : 'normal'
    };
  };

  const getCheckboxStyle = (option: string) => {
    if (isShowAnswer) {
      if (option === question.correct_answer) {
        return { color: 'green', fontWeight: 'bold' };
      }
      if (option === optionUser && option !== question.correct_answer) {
        return { color: 'red', fontWeight: 'bold' };
      }
    }
    return { color: 'inherit', fontWeight: 'normal' };
  };

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestion = {
      ...question,
      user_answer: { questionId: question.id, option: e.target.value }
    };
    setSelectedOption(e.target.value);

    updateQuestion(updatedQuestion);
  };

  const clearSelection = () => {
    const updatedQuestion = {
      ...question,
      user_answer: { questionId: question.id, option: '' }
    };
    setSelectedOption('');
    updateQuestion(updatedQuestion);
  };

  return (
    <Box mb={64} onChange={handleOptionChange}>
      <Box mt={32}>
        <Group align="center" mb={8}>
          <Title order={4}>{`${question.order}. ${question.question_title}`}</Title>
        </Group>
        {!isShowAnswer || !optionUser ? (
          <RadioGroup
            variant="vertical"
            required
            value={isShowAnswer ? question.correct_answer : selectedOption}>
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
        ) : (
          <Box ml={8}>
            {options.map((option: string) => {
              const answerKey: AnswerKey = `answer_${option}` as AnswerKey;
              return (
                <Checkbox
                  key={option}
                  icon={CheckIcon}
                  disabled={false}
                  checked={
                    isShowAnswer
                      ? option === question.correct_answer || option === optionUser
                      : option === optionUser
                  }
                  value={option}
                  label={`${option.toLocaleUpperCase()}. ${question[answerKey]}`}
                  mb={8}
                  style={getCheckboxStyle(option)}
                  size="md"
                  onChange={handleOptionChange}
                />
              );
            })}
          </Box>
        )}
        {!isShowAnswer && (
          <Button variant="outline" onClick={clearSelection} w={150} mb={32}>
            Clear Selection
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default QuestionPart5;
