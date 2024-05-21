import { ChangeEvent } from 'react';
import { Box, CheckIcon, Group, Radio, RadioGroup, Title } from '@mantine/core';
import { QuestionProps } from 'types';
import { getAudioUrl } from 'utils/parse.util';

type AnswerKey = 'answer_a' | 'answer_b' | 'answer_c' | 'answer_d';

const QuestionPart = ({
  question,
  updateQuestion,
  isDisable,
  isShowAnswer,
  optionUser
}: QuestionProps) => {
  const partNums = ['1', '2'];

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

  const isShowAudio = () => {
    if (['1', '2'].includes(question.part_num)) {
      return true;
    }
    return false;
  };

  const options = ['a', 'b', 'c', 'd'] as const;

  return (
    <Box mb={64} onChange={handleOptionChange}>
      {isShowAudio() && (
        <Box>
          <audio controls className="w-full mb-8">
            <source src={getAudioUrl(question.audio)} type="audio/mpeg" />
          </audio>
        </Box>
      )}
      <Group align="center" mb={8}>
        <Title
          order={
            4
          }>{`${question.order}. ${!partNums.includes(question.part_num) ? question.question_title : ''}`}</Title>
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
              label={
                partNums.includes(question.part_num)
                  ? `${option.toLocaleUpperCase()} . `
                  : question[answerKey]
              }
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
