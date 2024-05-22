import { Box, Flex, Loader, Title } from '@mantine/core';
import { useGetResultByUserIdQuery } from 'store/services/resultApi';
import { useEffect, useState } from 'react';
import TableResultUser from 'components/Table/TableResultUser';

interface ResultUser {
  id: string;
}

const ResultUser = (props: ResultUser) => {
  const { id } = props;
  const { data, isLoading } = useGetResultByUserIdQuery(id);

  const [results, setResult] = useState([]);

  useEffect(() => {
    if (data?.achievements) {
      setResult(data.achievements);
    }
  }, [data]);

  return (
    <Box>
      {isLoading ? (
        <Flex justify="center">
          <Loader size={30} ta="center" />
        </Flex>
      ) : (
        <Box mt={64}>
          <Title ta="center" order={3} mb={16}>
            Result Exams
          </Title>
          <TableResultUser data={results} />
        </Box>
      )}
    </Box>
  );
};

export default ResultUser;
