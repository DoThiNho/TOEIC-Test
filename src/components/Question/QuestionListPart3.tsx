import { Box } from '@mantine/core';
import { QuestionListPart34Props } from 'types';
import QuestionPart3 from './QuestionPart3';
import { getAudioUrl, getImageUrl } from 'utils/parse.util';

const QuestionListPart3 = (props: QuestionListPart34Props) => {
  const { groupQuestions, isDisable, isShowAnswer, updateQuestion } = props;

  return (
    <Box>
      {groupQuestions.map((groupQuestion) => (
        <Box>
          <Box mt={32}>
            <audio controls className="w-full">
              <source src={getAudioUrl(groupQuestion.group_audio)} type="audio/mpeg" />
            </audio>
          </Box>
          {getImageUrl(groupQuestion.group_image) && (
            <img src={getImageUrl(groupQuestion.group_image)} alt="image group" />
          )}
          {[...groupQuestion.questions]
            .sort((a, b) => a.order - b.order)
            .map((question) => (
              <QuestionPart3
                key={question.id}
                question={question}
                isDisable={isDisable}
                isShowAnswer={isShowAnswer}
                updateQuestion={updateQuestion}
                optionUser={question.user_answer?.option}
              />
            ))}
        </Box>
      ))}
    </Box>
  );
};

export default QuestionListPart3;
