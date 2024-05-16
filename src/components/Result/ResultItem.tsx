import { Badge, Button, Card, Group, Text, Title } from '@mantine/core';
import moment from 'moment';
import { ResultProps } from 'types';

const ResultItem = (props: ResultProps) => {
  const { result } = props;
  return (
    <Card shadow="md">
      <Title order={3}>{result.title}</Title>
      <Group my={4}>
        <Badge size="md" color="yellow">
          {result.type}
        </Badge>
        {result?.parts?.split(',').map((item, index) => (
          <Badge key={index} size="sm" color="yellow">
            Part {item}
          </Badge>
        ))}
      </Group>
      <Text>Date: {moment(result.date).format('DD-MM-YYYY')}</Text>
      <Text my={4}>Completion time: {result.complete_time}</Text>
      <Text>
        Result: {result.total_correct}/{result.total_questions}
      </Text>
      <Button variant="outline" mt={16}>
        Show detail
      </Button>
    </Card>
  );
};

export default ResultItem;
