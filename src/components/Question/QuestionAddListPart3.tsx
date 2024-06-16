import { Box, Divider } from '@mantine/core';
import { useState } from 'react';
import { GroupQuestionProps } from 'types';
import { getAudioUrl, getImageUrl } from 'utils/parse.util';
import QuestionAddPart3 from './QuestionAddPart3';

interface QuestionAddListPart3Props {
  groupQuestions: GroupQuestionProps[];
}

const QuestionAddListPart3 = (props: QuestionAddListPart3Props) => {
  const { groupQuestions } = props;
  const [audioUrl, setAudioUrl] = useState<string | undefined>('');

  const handleFileUpload = (event: any, type: 'image' | 'audio') => {
    const files = event.target?.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (type === 'audio') {
          if (typeof result === 'string' || result === null) {
            setAudioUrl(result || '');
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      {groupQuestions.map((groupQuestion) => (
        <Box>
          <Box mt={32}>
            <audio controls className="w-full">
              <source src={audioUrl || getAudioUrl(groupQuestion.group_audio)} type="audio/mpeg" />
            </audio>
            {/* <iframe
              className="mb-4"
              height="50"
              src={groupQuestion.group_audio}
              allowFullScreen={false}></iframe> */}
            <input
              accept="audio/*"
              type="file"
              onChange={(event) => handleFileUpload(event, 'audio')}
            />
          </Box>
          {getImageUrl(groupQuestion.group_image) && (
            <img src={getImageUrl(groupQuestion.group_image)} alt="image group" />
          )}
          {[...groupQuestion.questions]
            .sort((a, b) => a.order - b.order)
            .map((question) => (
              <QuestionAddPart3 key={question.id} question={question} />
            ))}
        </Box>
      ))}
      <Divider my="md" />
    </Box>
  );
};

export default QuestionAddListPart3;
