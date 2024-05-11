import {
  Box,
  ComboboxData,
  ComboboxItem,
  Container,
  Group,
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
import _ from 'lodash';
import { useGetTestsQuery } from 'store/services/testApi';

const ExamListTestsPage = () => {
  const [tests, setTests] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [queryOptions, setQueryOptions] = useState({});
  const { data: testsData } = useGetTestsQuery(queryOptions);
  const { data: booksData } = useGetBooksQuery(queryOptions);

  const [selectedBook, setSelectedBook] = useState<string | null>('');
  const [valueSearch, setValueSearch] = useState<string>('');

  useEffect(() => {
    if (testsData) {
      setTests(testsData.tests);
    }
  }, [testsData]);

  useEffect(() => {
    if (booksData) {
      setAllBooks(booksData.books);
    }
  }, [booksData]);

  const setQueryOptionsValue = (value: string | undefined) => {
    if (_.isEmpty(value)) {
      setQueryOptions({});
    } else {
      setQueryOptions({ search: value });
      setSelectedBook(null);
    }
  };

  const handleChangeSelect = (option: ComboboxItem) => {
    setQueryOptionsValue(option?.value);
    setSelectedBook(option?.value);
  };

  const handleSearch = (value: string) => {
    setQueryOptionsValue(value);
    setValueSearch(value);
  };

  return (
    <Container size="xl">
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
            onChange={(event) => handleSearch(event.currentTarget.value)}
          />
        </Group>
        <ExamList exams={tests} />
        {/* <Flex justify="center">
          <Pagination total={2} mt={32} />
        </Flex> */}
      </Box>
    </Container>
  );
};

export default ExamListTestsPage;
