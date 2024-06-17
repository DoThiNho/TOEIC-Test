import { Flex, Grid, Loader } from '@mantine/core';
import ExamItem from './ExamItem';
import { ExamListCardProps } from 'types';

const ExamList = (props: ExamListCardProps) => {
  const { exams } = props;

  return (
    <Grid gutter="xl">
      {exams.length === 0 && (
        <Flex w="100%" justify="center">
          <Loader size={30} ta="center" />
        </Flex>
      )}
      {exams.map((exam) => (
        <Grid.Col key={exam.id} span={{ base: 12, md: 6, lg: 4 }}>
          <ExamItem exam={exam} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default ExamList;
