import { Group, Radio, RadioGroup, Text, TextInput, Title } from '@mantine/core';
import { ChangeEvent, useState } from 'react';
import { Question, QuestionPart } from 'types';

interface QuestionAddPart3Prop {
  question?: Question;
}

const QuestionAddPart7 = (props: QuestionAddPart3Prop) => {
  const { question } = props;

  const [questionData, setQuestion] = useState<QuestionPart>(
    {
      questionTitle: question?.question_title || '',
      order: question?.order || 0,
      answerA: question?.answer_a || '',
      answerB: question?.answer_b || '',
      answerC: question?.answer_c || '',
      answerD: question?.answer_d || '',
      correctAnswer: question?.correct_answer || '',
      image: question?.image || ''
    } || {}
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuestion({
      ...question,
      [name]: value
    });
  };

  const handleCorrectAnswerChange = (value: string) => {
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      correctAnswer: value
    }));
  };

  return (
    <Group flex={1} mb={16}>
      <Group my={32}>
        <Title order={3}>{questionData.order}.</Title>
        <TextInput
          w="80%"
          name="questionTitle"
          value={questionData.questionTitle}
          onChange={handleChange}
        />
      </Group>
      <RadioGroup w="100%" value={questionData.correctAnswer} onChange={handleCorrectAnswerChange}>
        <Group mb={8}>
          <Radio value="a" />
          <Text>A. </Text>
          <TextInput w="80%" name="answerA" value={questionData.answerA} onChange={handleChange} />
        </Group>
        <Group mb={8}>
          <Radio value="b" />
          <Text>B. </Text>
          <TextInput w="80%" name="answerB" value={questionData.answerB} onChange={handleChange} />
        </Group>
        <Group mb={8}>
          <Radio value="c" />
          <Text>C. </Text>
          <TextInput w="80%" name="answerC" value={questionData.answerC} onChange={handleChange} />
        </Group>
        <Group mb={8}>
          <Radio value="d" />
          <Text>D. </Text>
          <TextInput w="80%" name="answerD" value={questionData.answerD} onChange={handleChange} />
        </Group>
      </RadioGroup>
    </Group>
  );
};

export default QuestionAddPart7;
