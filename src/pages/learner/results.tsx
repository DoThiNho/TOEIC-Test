import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Container, Flex, Group, Loader, Pagination, TextInput, Title } from '@mantine/core';
import ResultList from 'components/Result/ResultList';
import { useEffect, useState } from 'react';
import { useGetResultsQuery } from 'store/services/resultApi';

const Results = () => {
  const { data: allResult } = useGetResultsQuery({});

  const [results, setResult] = useState([]);
  const [valueSearch, setValueSearch] = useState<string>('');
  const [queryOptions, setQueryOptions] = useState({ limit: 6, page: 1, search: valueSearch });
  const [activePage, setPage] = useState(1);
  const { data, isLoading } = useGetResultsQuery(queryOptions);

  useEffect(() => {
    if (data?.achievements) {
      setResult(data.achievements);
    }
  }, [data]);

  useEffect(() => {
    setQueryOptions({
      limit: 6,
      page: activePage,
      search: valueSearch
    });
  }, [activePage, valueSearch]);

  console.log({ allResult });

  return (
    <Box mb={150}>
      <Container size="xl" pt={isLoading ? 0 : 130}>
        {isLoading ? (
          <Group justify="center" align="center" mih="100vh">
            <Loader size={64} />
          </Group>
        ) : (
          <>
            <Box>
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
                {allResult?.achievements.length > 6 && (
                  <Pagination
                    value={activePage}
                    onChange={setPage}
                    total={allResult.achievements.length / 6}
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
