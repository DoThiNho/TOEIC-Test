import { Box, Group, Radio, RadioGroup, Title } from '@mantine/core';
import { ChangeEvent } from 'react';
import { QuestionProps } from 'types';

const QuestionPart = (props: QuestionProps) => {
  const { question, updateQuestion, isDisable, optionUser } = props;

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestion = {
      ...question,
      user_answer: { questionId: question.id, option: e.target.value }
    };
    updateQuestion(updatedQuestion);
  };

  const getRadioStyle = (value: string) => ({
    color: optionUser === value ? 'green' : 'inherit',
    fontWeight: optionUser === value ? 'bold' : 'normal'
  });

  return (
    <Box mb={64} onChange={handleOptionChange}>
      <Group align="center" mb={8}>
        <Title order={4}>{question.order} . </Title>
        <Title order={4}>{question.question_title}</Title>
      </Group>
      <RadioGroup variant="vertical" required value={optionUser}>
        <Radio
          disabled={isDisable}
          value="a"
          label={question.answer_a}
          mb={8}
          style={getRadioStyle('a')}
          checked={optionUser === 'a'}
        />
        <Radio
          disabled={isDisable}
          value="b"
          label={question.answer_b}
          mb={8}
          style={getRadioStyle('b')}
          checked={optionUser === 'b'}
        />
        <Radio
          disabled={isDisable}
          value="c"
          label={question.answer_c}
          mb={8}
          style={getRadioStyle('c')}
          checked={optionUser === 'c'}
        />
        {question.answer_d && (
          <Radio
            disabled={isDisable}
            value="d"
            label={question.answer_d}
            style={getRadioStyle('d')}
            checked={optionUser === 'd'}
          />
        )}
      </RadioGroup>
    </Box>
  );
};

export default QuestionPart;
