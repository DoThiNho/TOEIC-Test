import {
  Box,
  Button,
  Divider,
  Group,
  Radio,
  RadioGroup,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { ChangeEvent, useState } from 'react';
import { Question, QuestionPart } from 'types';
import { getAudioUrl } from 'utils/parse.util';

interface QuestionAddPart1Prop {
  question?: Question;
}

const QuestionAddPart2 = (props: QuestionAddPart1Prop) => {
  const { question } = props;

  const [audioUrl, setAudioUrl] = useState<string | undefined>('');
  const [questionData, setQuestion] = useState<QuestionPart>(
    {
      order: question?.order || 0,
      answerA: question?.answer_a || '',
      answerB: question?.answer_b || '',
      answerC: question?.answer_c || '',
      correctAnswer: question?.correct_answer || '',
      audio: question?.audio || ''
    } || {}
  );
  const handleFileUpload = (event: any, type: 'image' | 'audio') => {
    const files = event.target?.files;

    console.log(event.target, { files });

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (type === 'audio') {
          console.log({ result });
          if (typeof result === 'string' || result === null) {
            setAudioUrl(result || '');
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
    <>
      <Group mb={32} w="100%">
        <Group>
          <Title order={3}>{questionData.order}</Title>
          <Text> Audio: </Text>
          <Box mt={16}>
            <audio controls className="mb-8">
              <source
                src={audioUrl ? audioUrl : getAudioUrl(questionData.audio || '')}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          </Box>
          <input
            id={`upload-audio-${questionData.order}`}
            accept="audio/*"
            type="file"
            onChange={(event) => handleFileUpload(event, 'audio')}
          />
        </Group>
        <Box flex={1}>
          <RadioGroup value={questionData.correctAnswer} onChange={handleCorrectAnswerChange}>
            <Group mb={8}>
              <Radio value="a" />
              <Text>A. </Text>
              <TextInput
                w="80%"
                name="answerA"
                value={questionData.answerA}
                onChange={handleChange}
              />
            </Group>
            <Group mb={8}>
              <Radio value="b" />
              <Text>B. </Text>
              <TextInput
                w="80%"
                name="answerB"
                value={questionData.answerB}
                onChange={handleChange}
              />
            </Group>
            <Group mb={8}>
              <Radio value="c" />
              <Text>C. </Text>
              <TextInput
                w="80%"
                name="answerC"
                value={questionData.answerC}
                onChange={handleChange}
              />
            </Group>
          </RadioGroup>
        </Box>
        <Button>{question ? 'Edit' : 'Add'}</Button>
      </Group>
      <Divider my="md" />
    </>
  );
};

export default QuestionAddPart2;
