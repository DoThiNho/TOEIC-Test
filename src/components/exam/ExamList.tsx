import { Grid } from '@mantine/core';
import ExamItem from './ExamItem';

const ExamList = () => {
  return (
    <Grid gutter="xl">
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <ExamItem />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <ExamItem />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <ExamItem />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <ExamItem />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <ExamItem />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <ExamItem />
      </Grid.Col>
    </Grid>
  );
};

export default ExamList;
