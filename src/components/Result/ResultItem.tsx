import { Badge, Button, Card, Group, Text, Title } from '@mantine/core';

const ResultItem = () => {
  return (
    <Card shadow="md">
      <Title order={3}>Practice Set 2023 TOEIC Test 3</Title>
      <Group my={4}>
        <Badge size="md" color="yellow">
          Practice
        </Badge>
        <Badge size="md" color="yellow">
          Part 5
        </Badge>
        <Badge size="md" color="yellow">
          Part 6
        </Badge>
        <Badge size="md" color="yellow">
          Part 7
        </Badge>
      </Group>
      <Text>Date: 13/04/2024</Text>
      <Text my={4}>Completion time: 1:22:51</Text>
      <Text>Result: 63/100</Text>
      <Button variant="outline" mt={16}>
        Show detail
      </Button>
    </Card>
  );
};

export default ResultItem;
