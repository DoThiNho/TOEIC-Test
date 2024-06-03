import { Box, Divider, Grid, GridCol } from '@mantine/core';
import { GroupQuestionProps } from 'types';
import { getImageUrl } from 'utils/parse.util';
import QuestionAddPart7 from './QuestionAddPart7';

interface QuestionAddListPart6Props {
  groupQuestions: GroupQuestionProps[];
}

const QuestionAddListPart7 = (props: QuestionAddListPart6Props) => {
  const { groupQuestions } = props;

  return (
    <Box>
      {groupQuestions.map((groupQuestion) => (
        <>
          <Grid align="center">
            <GridCol span={{ base: 12, md: 6, lg: 6 }}>
              {groupQuestion.group_image.split(',').map((img) => (
                <img className="mb-4" src={getImageUrl(img)} alt="image question" />
              ))}
            </GridCol>
            <GridCol span={{ base: 12, md: 6, lg: 6 }}>
              <Box mah={500} className="overflow-y-auto">
                {groupQuestion.questions.map((question) => (
                  <QuestionAddPart7 key={question.id} question={question} />
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

export default QuestionAddListPart7;
