import moment from 'moment';
import { Anchor, Badge, Box, Group, Table, Title } from '@mantine/core';
import { TableResultProps } from 'types';

const TableResult = (props: TableResultProps) => {
  const { data } = props;

  const rows = data.map((result) => (
    <Table.Tr key={result.id}>
      <Table.Td>
        {moment(result.date).format('DD-MM-YYYY')}
        <Group gap={8} my={4} justify="center">
          <Badge size="sm" color={result.type === 'Practice' ? 'yellow' : 'blue'}>
            {result.type}
          </Badge>
          {result.parts !== '' && (
            <>
              {result.parts?.split(',').map((item, index) => (
                <Badge key={index} size="sm" color="yellow">
                  Part {item}
                </Badge>
              ))}
            </>
          )}
        </Group>
      </Table.Td>
      <Table.Td>{`${result.total_corrects} / ${result.total_questions}`}</Table.Td>
      <Table.Td>{result.complete_time}</Table.Td>
      <Table.Td>
        <Anchor href={`/learner/tests/${data[0].test_id}/results/${result.id}`}>Show detail</Anchor>
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
