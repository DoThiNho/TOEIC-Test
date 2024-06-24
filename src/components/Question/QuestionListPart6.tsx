import { Box, Divider, Grid, GridCol } from '@mantine/core';
import { QuestionListPart34Props } from 'types';
import QuestionPart6 from './QuestionPart6';

const QuestionListPart6 = (props: QuestionListPart34Props) => {
  const { groupQuestions, isDisable, isShowAnswer, updateQuestion, answers } = props;

  return (
    <Box>
      {groupQuestions.map((groupQuestion) => (
        <>
          <Grid align="center">
            <GridCol span={{ base: 12, md: 6, lg: 6 }}>
              {groupQuestion.group_image.split(',').map((img) => (
                <img className="mb-4" src={img} alt="image question" />
              ))}
            </GridCol>
            <GridCol span={{ base: 12, md: 6, lg: 6 }}>
              <Box mah={500} className="overflow-y-auto">
                {groupQuestion.questions.map((question) => (
                  <QuestionPart6
                    key={question.id}
                    question={question}
                    isDisable={isDisable}
                    isShowAnswer={isShowAnswer}
                    updateQuestion={updateQuestion}
                    optionUser={answers?.find((item) => item.question_id === question.id)?.option}
                  />
                ))}
              </Box>
            </GridCol>
          </Grid>
          <Divider my={16} />
        </>
      ))}
    </Box>
  );
};

export default QuestionListPart6;
