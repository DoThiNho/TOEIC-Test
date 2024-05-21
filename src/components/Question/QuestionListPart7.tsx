import { Box, Divider, Grid, GridCol } from '@mantine/core';
import { QuestionListPart34Props } from 'types';
import QuestionPart3 from './QuestionPart3';
import { getImageUrl } from 'utils/parse.util';

const QuestionListPart7 = (props: QuestionListPart34Props) => {
  const { groupQuestions, isDisable, isShowAnswer, updateQuestion } = props;

  return (
    <Box>
      {groupQuestions.map((groupQuestion) => (
        <>
          <Grid mt={32}>
            <GridCol span={{ base: 12, md: 6, lg: 6 }}>
              <Box mah={800} className="overflow-auto">
                {groupQuestion.group_image.split(',').map((img) => (
                  <img className="mb-4" src={getImageUrl(img.trim())} alt="image question" />
                ))}
              </Box>
            </GridCol>
            <GridCol span={{ base: 12, md: 6, lg: 6 }}>
              <Box>
                {groupQuestion.questions.map((question) => (
                  <QuestionPart3
                    key={question.id}
                    question={question}
                    isDisable={isDisable}
                    isShowAnswer={isShowAnswer}
                    updateQuestion={updateQuestion}
                  />
                ))}
              </Box>
            </GridCol>
          </Grid>
          <Divider mt={32} />
        </>
      ))}
    </Box>
  );
};

export default QuestionListPart7;
