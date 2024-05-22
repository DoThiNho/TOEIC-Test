import moment from 'moment';
import { ActionIcon, Badge, Box, Group, Table } from '@mantine/core';
import { TableResultProps } from 'types';
import { IconTrash } from '@tabler/icons-react';

const TableResultUser = (props: TableResultProps) => {
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
      <Table.Td>{result.test_title}</Table.Td>
      <Table.Td>{result.book_title}</Table.Td>
      <Table.Td>{`${result.total_correct} / ${result.total_questions}`}</Table.Td>
      <Table.Td>{result.complete_time}</Table.Td>
      <Table.Td>
        <ActionIcon variant="filled" color="red">
          <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box mt={32}>
      <Table striped withTableBorder withColumnBorders layout="auto" ta="center">
        <Table.Thead>
          <Table.Tr>
            <Table.Th ta="center">Date</Table.Th>
            <Table.Th ta="center">Book</Table.Th>
            <Table.Th ta="center">Test</Table.Th>
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

export default TableResultUser;
