import { Box, Divider, Grid, GridCol } from '@mantine/core';
import { GroupQuestionProps } from 'types';
import QuestionAddPart6 from './QuestionAddPart6';

interface QuestionAddListPart6Props {
  groupQuestions: GroupQuestionProps[];
}

const QuestionAddListPart6 = (props: QuestionAddListPart6Props) => {
  const { groupQuestions } = props;

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
                  <QuestionAddPart6 key={question.id} question={question} />
                ))}
              </Box>
            </GridCol>
          </Grid>
          <Divider my={16} />
        </>
      ))}
      <Divider my="md" />
    </Box>
  );
};

export default QuestionAddListPart6;
