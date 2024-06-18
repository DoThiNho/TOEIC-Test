import {
  Box,
  ComboboxData,
  ComboboxItem,
  Container,
  Flex,
  Group,
  Loader,
  Pagination,
  Select,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import ExamList from './ExamList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useGetBooksQuery } from 'store/services/bookApi';
import { Exam } from 'types';
import { useGetTestsQuery } from 'store/services/testApi';
import io from 'socket.io-client';

const socket = io('https://toiec-test-be-production.up.railway.app');

const ExamListTestsPage = () => {
  const [tests, setTests] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const { data: allTests } = useGetTestsQuery({});
  const [queryOptions, setQueryOptions] = useState({});
  const { data: testsData, isLoading, refetch } = useGetTestsQuery(queryOptions);
  const { data: booksData } = useGetBooksQuery({});

  const [selectedBook, setSelectedBook] = useState<string | null>('');
  const [valueSearch, setValueSearch] = useState<string>('');
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    socket.on('delete-test', (data) => {
      console.log(data);
      refetch();
    });
    socket.on('add-test', (data) => {
      console.log(data);
      refetch();
    });
  }, [queryOptions]);

  useEffect(() => {
    if (testsData) {
      setTests(testsData.data);
    }
  }, [testsData]);

  useEffect(() => {
    if (booksData) {
      setAllBooks(booksData.data);
    }
  }, [booksData]);

  useEffect(() => {
    setQueryOptions({
      limit: 9,
      page: activePage,
      search: valueSearch
    });
  }, [activePage, valueSearch]);

  const handleChangeSelect = (option: ComboboxItem) => {
    let newTests = [];
    if (!option?.value) newTests = testsData.data;
    else newTests = tests.filter((test: Exam) => test.book_title.includes(option?.value));
    setTests(newTests);
    setSelectedBook(option?.value);
  };

  return (
    <Container size="xl" mb={150}>
      {isLoading ? (
        <Flex justify="center">
          <Loader size={30} ta="center" />
        </Flex>
      ) : (
        <Box>
          <Title order={1} ta="center" mb={32}>
            Exams
          </Title>
          <Group justify="space-between" mb={32}>
            <Group>
              <Text>Ets: </Text>
              <Select
                placeholder="Pick version"
                data={allBooks.map((book: Exam) => book.title) as ComboboxData}
                value={selectedBook}
                onChange={(_value, option) => handleChangeSelect(option)}
                clearable
              />
            </Group>
            <TextInput
              rightSectionPointerEvents="none"
              rightSection={<FontAwesomeIcon icon={faSearch} />}
              placeholder="Enter test"
              value={valueSearch}
              onChange={(event) => setValueSearch(event.currentTarget.value)}
            />
          </Group>
          {tests.length > 0 ? (
            <>
              <ExamList exams={tests} />
              <Flex justify="center" mt={32}>
                {allTests?.data.length > 9 && (
                  <Pagination
                    value={activePage}
                    onChange={setPage}
                    total={allTests?.data.length / 9}
                  />
                )}
              </Flex>
            </>
          ) : (
            <Flex mih={300} align="center" justify="center">
              <Text>Not found tests</Text>
            </Flex>
          )}
        </Box>
      )}
    </Container>
  );
};

export default ExamListTestsPage;
