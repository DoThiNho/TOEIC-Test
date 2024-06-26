import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Loader,
  Pagination,
  TextInput,
  Title
} from '@mantine/core';
import ResultList from 'components/Result/ResultList';
import { API_URL } from 'constants/constant';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useGetResultsQuery } from 'store/services/resultApi';

const socket = io(API_URL);

const Results = () => {
  const { data: allResult } = useGetResultsQuery({});
  const navigate = useNavigate();

  const [results, setResult] = useState([]);
  const [valueSearch, setValueSearch] = useState<string>('');
  const [queryOptions, setQueryOptions] = useState({ limit: 6, page: 1, search: valueSearch });
  const [activePage, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetResultsQuery(queryOptions);

  useEffect(() => {
    socket.on('change-result', () => {
      refetch();
    });
  }, []);

  useEffect(() => {
    if (data?.data) {
      setResult(data.data);
    }
  }, [data]);

  useEffect(() => {
    setQueryOptions({
      limit: 6,
      page: activePage,
      search: valueSearch
    });
  }, [activePage, valueSearch]);

  return (
    <Box mb={150}>
      <Container size="xl" pt={isLoading ? 0 : 50}>
        {isLoading ? (
          <Group justify="center" align="center" mih="100vh">
            <Loader size={32} />
          </Group>
        ) : (
          <>
            <Box>
              <Button
                variant="light"
                leftSection={<FontAwesomeIcon icon={faArrowLeft} />}
                onClick={() => navigate(-1)}>
                Go back
              </Button>
              <Title order={1} ta="center" mb={32}>
                Results
              </Title>
              <Group justify="end" mb={32}>
                <TextInput
                  rightSectionPointerEvents="none"
                  rightSection={<FontAwesomeIcon icon={faSearch} />}
                  placeholder="Enter test"
                  value={valueSearch}
                  onChange={(event) => setValueSearch(event.currentTarget.value)}
                />
              </Group>
              <ResultList data={results} />
              <Flex justify="center" mt={32}>
                {allResult?.data.length > 6 && (
                  <Pagination
                    value={activePage}
                    onChange={setPage}
                    total={allResult.data.length / 6}
                  />
                )}
              </Flex>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Results;
