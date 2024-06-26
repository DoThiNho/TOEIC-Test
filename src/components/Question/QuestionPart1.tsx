import {
  Box,
  Button,
  CheckIcon,
  Checkbox,
  Grid,
  GridCol,
  Group,
  Radio,
  RadioGroup,
  Title
} from '@mantine/core';
import { ChangeEvent, useState, useEffect } from 'react';
import { QuestionProps } from 'types';
import { getAudioUrl } from 'utils/parse.util';

const QuestionPart1 = (props: QuestionProps) => {
  const { question, updateQuestion, isDisable, isShowAnswer, optionUser, isShowAudio } = props;
  const [selectedOption, setSelectedOption] = useState(optionUser);

  useEffect(() => {
    setSelectedOption(optionUser);
  }, [optionUser]);

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

  const getLabel = (option: string) => {
    const textAnswer = `answer_${option}`;
    return isShowAnswer
      ? `${option.toLocaleUpperCase()} . ${question[textAnswer]}`
      : `${option.toLocaleUpperCase()} .`;
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
    <Group mb={64} gap={64} onChange={handleOptionChange} w={isShowAnswer ? '80%' : '100%'}>
      <Grid w="100%">
        <GridCol span={{ base: 12, md: 6, lg: 6 }}>
          <img
            width="100%"
            height="100%"
            className="mb-4"
            src={question.image}
            alt="image question"
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 6, lg: 6 }} className="flex flex-col justify-center">
          {isShowAudio && (
            <Box w="100%">
              <audio controls className="w-full">
                <source src={getAudioUrl(question.audio)} type="audio/mpeg" />
              </audio>
            </Box>
          )}
          <Group mt={32}>
            <Title order={4}>{`${question.order}. `}</Title>
            {!isShowAnswer ? (
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
            <Button variant="outline" onClick={clearSelection} w={150} mt={16}>
              Clear Selection
            </Button>
          )}
        </GridCol>
      </Grid>
    </Group>
  );
};

export default QuestionPart1;
