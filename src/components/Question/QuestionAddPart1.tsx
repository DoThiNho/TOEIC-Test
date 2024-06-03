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
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useUpdateQuestionMutation } from 'store/services/questionApi';
import { Question, QuestionPart } from 'types';
import { getAudioUrl, getImageUrl } from 'utils/parse.util';

interface QuestionAddPart1Prop {
  question?: Question;
}

const QuestionAddPart1 = (props: QuestionAddPart1Prop) => {
  const { question } = props;

  const [imageUrl, setImageUrl] = useState<string | undefined>('');
  const [audioUrl, setAudioUrl] = useState<string | undefined>('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [questionData, setQuestionData] = useState<QuestionPart>({});
  const [updateQuestion] = useUpdateQuestionMutation();

  useEffect(() => {
    if (question) {
      setQuestionData({
        order: question.order,
        questionTitle: question?.question_title,
        answerA: question?.answer_a,
        answerB: question?.answer_b,
        answerC: question?.answer_c,
        answerD: question?.answer_d,
        correctAnswer: question?.correct_answer,
        image: question?.image,
        audio: question?.audio
      });
    }
  }, [question]);

  const handleFileUpload = (event: any, type: 'image' | 'audio') => {
    const files = event.target?.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (type === 'image') {
          if (typeof result === 'string' || result === null) {
            setImageUrl(result || '');
            setImageFile(file);
          }
        } else if (type === 'audio') {
          if (typeof result === 'string' || result === null) {
            setAudioUrl(result || '');
            setAudioFile(file);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateQuestion = async () => {
    const newQuestion = {
      question_title: questionData.questionTitle,
      answer_a: questionData.answerA,
      answer_b: questionData.answerB,
      answer_c: questionData.answerC,
      answer_d: questionData.answerD,
      order: questionData.order,
      part_num: '1',
      test_id: question?.test_id || '',
      part_id: question?.part_id || '',
      correct_answer: questionData.correctAnswer
    };

    console.log({ audioFile, imageFile });

    const form = new FormData();
    (Object.keys(newQuestion) as (keyof typeof newQuestion)[]).forEach((key) => {
      const value = newQuestion[key];
      if (value !== undefined && value !== null) {
        form.append(key, String(value));
      }
    });
    if (audioFile) {
      form.append('fileAudio', audioFile);
    } else {
      form.append('audio', question?.audio || '');
    }

    if (imageFile) {
      form.append('fileImage', imageFile);
    } else {
      form.append('image', question?.image || '');
    }

    console.log({ newQuestion, questionData });

    try {
      await updateQuestion({ id: question?.id || '', formData: form });
      toast.success('Question updated successfully');
    } catch (error) {
      console.error('Error adding question:', error);
      toast.error('Failed to add question');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value
    });
  };

  const handleCorrectAnswerChange = (value: string) => {
    setQuestionData((prevQuestion) => ({
      ...prevQuestion,
      correctAnswer: value
    }));
  };

  return (
    <>
      <Group mb={32} w="100%">
        <Title order={3}>{questionData.order}</Title>
        <Box>
          <Box bg="blue.0" className="relative" mb={16} w={500} h={350}>
            <Box w="100%" h="100%">
              {imageUrl ? (
                <img src={imageUrl} className="w-full h-full" alt="image error" />
              ) : (
                <img
                  src={getImageUrl(questionData.image || '')}
                  className="w-full h-full"
                  alt="image error"
                />
              )}
            </Box>
            <label
              htmlFor={`upload-image-${questionData.order}`}
              className="cursor-pointer absolute top-[50%] right-0 left-[30%]">
              <input
                id={`upload-image-${questionData.order}`}
                accept="image/*"
                type="file"
                onChange={(event) => handleFileUpload(event, 'image')}
              />
            </label>
          </Box>
          <Group>
            <Text>Audio: </Text>
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
        </Box>
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
            <Group mb={8}>
              <Radio value="d" />
              <Text>D. </Text>
              <TextInput
                w="80%"
                name="answerD"
                value={questionData.answerD}
                onChange={handleChange}
              />
            </Group>
          </RadioGroup>
        </Box>
        <Button onClick={handleUpdateQuestion}>{question ? 'Edit' : 'Add'}</Button>
      </Group>
      <Divider my="md" />
    </>
  );
};

export default QuestionAddPart1;
