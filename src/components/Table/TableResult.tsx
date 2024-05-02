import { Anchor, Badge, Box, Group, Table, Title } from '@mantine/core';
import { RESULTS } from 'constants/constant';

const TableResult = () => {
  const rows = RESULTS.map((result) => (
    <Table.Tr key={result.id}>
      <Table.Td>
        {result.date}
        <Group gap={8} my={4} justify="center">
          <Badge size="sm" color={result.type === 'Practice' ? 'yellow' : 'blue'}>
            {result.type}
          </Badge>
          {result.type === 'Practice' && (
            <>
              <Badge size="sm" color="yellow">
                Part 5
              </Badge>
              <Badge size="sm" color="yellow">
                Part 6
              </Badge>
            </>
          )}
        </Group>
      </Table.Td>
      <Table.Td>{`${result.totalCorrect} / ${result.totalQuestion}`}</Table.Td>
      <Table.Td>{result.time}</Table.Td>
      <Table.Td>
        <Anchor href={`/tests/${result.id}`} target="_blank">
          Show detail
        </Anchor>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box>
      <Title order={3} mb={16}>
        Results of your test:
      </Title>
      <Table striped withTableBorder withColumnBorders layout="auto" ta="center">
        <Table.Thead>
          <Table.Tr>
            <Table.Th ta="center">Date</Table.Th>
            <Table.Th ta="center">Result</Table.Th>
            <Table.Th ta="center">Time duration</Table.Th>
            <Table.Th ta="center"></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Box>
  );
};

export default TableResult;
