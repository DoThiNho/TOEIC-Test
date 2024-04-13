import { Box, Container, Grid, Title } from '@mantine/core';
import ExamItem from './ExamItem';

const ExamList = () => {
  return (
    <Container size="xl">
      <Box>
        <Title order={1} ta="center" mb={32}>
          Exams
        </Title>
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
      </Box>
    </Container>
  );
};

export default ExamList;
