import { Box, ComboboxData, FileInput, Select, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useGetBooksQuery } from 'store/services/bookApi';
import { Exam } from 'types';

const FormAddTest = () => {
  const { data: booksData } = useGetBooksQuery({});

  const [selectedBook, setSelectedBook] = useState<string | null>('');

  return (
    <Box>
      <Select
        checkIconPosition="right"
        placeholder="Select book"
        data={booksData?.books.map((book: Exam) => book.title) as ComboboxData}
        value={selectedBook}
        onChange={setSelectedBook}
        clearable
        mt={16}
      />
      <TextInput size="md" placeholder="Enter title..." name="title" mt={16} mb={8} />
      <FileInput label="Upload Audio" placeholder="Upload Audio" />
    </Box>
  );
};

export default FormAddTest;
