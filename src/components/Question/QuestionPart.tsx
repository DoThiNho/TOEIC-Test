import { Box, Group, Radio, RadioGroup, Title } from '@mantine/core';
import { QuestionProps } from 'types';

const QuestionPart = (props: QuestionProps) => {
  const { order, question } = props;
  return (
    <Box mb={64}>
      {question.image !== '' && (
        <img className="mb-4" src={`http://localhost:5173/src/assets/${question.image}`} />
      )}
      <Group>
        <Title order={3}>{order}</Title>
        <RadioGroup variant="vertical" required>
          <Radio value="a" label={question.answer_a} mb={8} />
          <Radio value="b" label={question.answer_b} mb={8} />
          <Radio value="c" label={question.answer_c} mb={8} />
          {question.answer_d !== '' && <Radio value="d" label={question.answer_d} />}
        </RadioGroup>
      </Group>
    </Box>
  );
};

export default QuestionPart;
