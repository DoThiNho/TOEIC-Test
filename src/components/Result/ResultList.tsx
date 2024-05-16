import { Grid } from '@mantine/core';
import ResultItem from './ResultItem';
import { TableResultProps } from 'types';

const ResultList = (props: TableResultProps) => {
  const { data } = props;
  return (
    <Grid gutter="xl">
      {data.map((result) => (
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <ResultItem result={result} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default ResultList;
