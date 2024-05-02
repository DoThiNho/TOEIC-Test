import { Grid } from '@mantine/core';
import ResultItem from './ResultItem';

const ResultList = () => {
  return (
    <Grid gutter="xl">
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <ResultItem />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <ResultItem />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <ResultItem />
      </Grid.Col>
    </Grid>
  );
};

export default ResultList;
