import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Checkbox,
  ComboboxData,
  ComboboxItem,
  Flex,
  Group,
  Loader,
  Pagination,
  Select,
  Table,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import ModalAddBook from 'components/Modal/ModalAddBook';
import ModalAddTest from 'components/Modal/ModalAddTest';
import ModalConfirmDelete from 'components/Modal/ModalConfirmDelete';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteBookByIdMutation, useGetBooksQuery } from 'store/services/bookApi';
import { useDeleteTestByIdMutation, useGetTestsQuery } from 'store/services/testApi';
import { Exam } from 'types';

const TableTest = () => {
  const [tests, setTests] = useState<Exam[]>([]);
  const { data: allTests } = useGetTestsQuery({});
  const [queryOptions, setQueryOptions] = useState({});
  const { data: testsData } = useGetTestsQuery(queryOptions);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [valueSearch, setValueSearch] = useState<string>('');
  const { data: booksData } = useGetBooksQuery({});
  const [selectedBook, setSelectedBook] = useState<string | null>('');
  const [activePage, setPage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [openedAddTest, { open: openAddTest, close: closeAddTest }] = useDisclosure(false);

  const [openedDeteleBook, { open: openDeteleBook, close: closeDeteleBook }] = useDisclosure(false);
  const [openedDeteleTest, { open: openDeteleTest, close: closeDeteleTest }] = useDisclosure(false);
  const [idDelTest, setIdDelTest] = useState('');

  const [deleteBookById] = useDeleteBookByIdMutation();
  const [deleteTestById] = useDeleteTestByIdMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (testsData) {
      setTests(testsData.data);
    }
  }, [testsData]);

  useEffect(() => {
    setQueryOptions({
      limit: 10,
      page: activePage,
      search: valueSearch
    });
  }, [activePage, valueSearch]);

  const rows = tests.map((test) => (
    <Table.Tr
      key={test.id}
      bg={selectedRows.includes(test.id) ? 'var(--mantine-color-blue-light)' : undefined}
      h={60}>
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(test.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, test.id]
                : selectedRows.filter((id) => id !== test.id)
            )
          }
        />
      </Table.Td>
      <Table.Td>{test.book_title}</Table.Td>
      <Table.Td>{test.title}</Table.Td>
      <Table.Td>120 minutes</Table.Td>
      <Table.Td>
        <Group gap={8} justify="center">
          <Badge size="md">#Reading</Badge>
          <Badge size="md">#Listening</Badge>
        </Group>
      </Table.Td>
      <Table.Td>
        <Group gap={16} justify="center">
          <ActionIcon
            variant="filled"
            color="yellow"
            onClick={() => navigate(`/admin/exams/${test.id}`)}>
            <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            color="red"
            onClick={() => {
              setIdDelTest(test.id);
              openDeteleTest();
            }}>
            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const handleChangeSelect = (option: ComboboxItem) => {
    let newTests = [];
    if (!option?.value) newTests = testsData.data;
    else newTests = allTests.data.filter((test: Exam) => test.book_title.includes(option?.value));
    setTests(newTests);
    setSelectedBook(option?.value);
  };

  const handleConfirmDeleteBook = async () => {
    const book = booksData?.data.find((book: Exam) => book.title === selectedBook);
    await deleteBookById(book.id);
    toast.success('Delete book successfully!');
    closeDeteleBook();
    setTests(allTests.tests);
    setSelectedBook('');
  };

  const handleConfirmDeleteTest = async () => {
    await deleteTestById(idDelTest);
    toast.success('Delete test successfully!');
    closeDeteleTest();
  };

  return (
    <Box mt={16}>
      <Title order={1} ta="center" mb={32}>
        MANAGER EXAM
      </Title>

      <Group mb={32} justify="space-between">
        <Group>
          <Select
            checkIconPosition="right"
            placeholder="Pick version"
            data={booksData?.data.map((book: Exam) => book.title) as ComboboxData}
            value={selectedBook}
            onChange={(_value, option) => handleChangeSelect(option)}
            clearable
          />
          <Button color="teal" onClick={openAddTest}>
            Add Test
          </Button>
          <Button color="red" onClick={openDeteleBook}>
            Delete Book
          </Button>
        </Group>
        <Group justify="space-between">
          <TextInput
            rightSectionPointerEvents="none"
            rightSection={<FontAwesomeIcon icon={faSearch} />}
            placeholder="Enter test"
            value={valueSearch}
            onChange={(event) => setValueSearch(event.currentTarget.value)}
          />
          <Button onClick={open}>Add Book</Button>
        </Group>
      </Group>
      {!testsData?.data ? (
        <Flex w="100%" h={600} align="center" justify="center">
          <Loader size={30} ta="center" />
        </Flex>
      ) : (
        <>
          <Table ta="center" striped highlightOnHover withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                <Table.Th ta="center">Book</Table.Th>
                <Table.Th ta="center">Test</Table.Th>
                <Table.Th ta="center">Time</Table.Th>
                <Table.Th ta="center">Type</Table.Th>
                <Table.Th ta="center">Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
          {tests.length === 0 && (
            <Flex w="100%" h={600} align="center" justify="center">
              <Text>Not found Test</Text>
            </Flex>
          )}
        </>
      )}
      <Flex justify="center" mt={32}>
        {(isEmpty(selectedBook) ? allTests?.tests : tests)?.length > 10 && (
          <Pagination
            value={activePage}
            onChange={setPage}
            total={(isEmpty(selectedBook) ? allTests?.tests : tests).length / 6}
          />
        )}
      </Flex>
      <ModalAddBook open={opened} onClose={close} />
      <ModalAddTest open={openedAddTest} onClose={closeAddTest} bookTitle={selectedBook || ''} />
      <ModalConfirmDelete
        text="book"
        open={openedDeteleBook}
        onClose={closeDeteleBook}
        handleConfirm={handleConfirmDeleteBook}
      />
      <ModalConfirmDelete
        text="test"
        open={openedDeteleTest}
        onClose={closeDeteleTest}
        handleConfirm={handleConfirmDeleteTest}
      />
    </Box>
  );
};

export default TableTest;
