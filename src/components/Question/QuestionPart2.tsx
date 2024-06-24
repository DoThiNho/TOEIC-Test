import { Box, Button, CheckIcon, Checkbox, Group, Radio, RadioGroup, Title } from '@mantine/core';
import { ChangeEvent, useEffect, useState } from 'react';
import { QuestionProps } from 'types';
import { getAudioUrl } from 'utils/parse.util';

const QuestionPart2 = (props: QuestionProps) => {
  const { question, updateQuestion, isDisable, isShowAnswer, optionUser, isShowAudio } = props;
  const [selectedOption, setSelectedOption] = useState(optionUser);
  const options = ['a', 'b', 'c'];

  useEffect(() => {
    setSelectedOption(optionUser);
  }, [optionUser]);

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
    <Box onChange={handleOptionChange}>
      {isShowAudio && (
        <audio controls className="w-full">
          <source src={getAudioUrl(question.audio)} type="audio/mpeg" />
        </audio>
      )}
      <Group align="flex-start" className="flex-col" mt={32} mb={8}>
        <Group>
          <Title order={4}>{`${question.order}. `}</Title>
          {isShowAnswer && <Title order={4}>{`${question.question_title}. `}</Title>}
        </Group>
        {!isShowAnswer && !optionUser ? (
          <RadioGroup
            variant="vertical"
            required
            value={isShowAnswer ? question.correct_answer : selectedOption}>
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
        ) : (
          <Box ml={8}>
            {options.map((option: string) => (
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
                label={getLabel(option)}
                mb={8}
                style={getCheckboxStyle(option)}
                size="md"
                onChange={handleOptionChange}
              />
            ))}
          </Box>
        )}
      </Group>
      {!isShowAnswer && (
        <Button variant="outline" onClick={clearSelection} w={150} mb={32}>
          Clear Selection
        </Button>
      )}
    </Box>
  );
};

export default QuestionPart2;
