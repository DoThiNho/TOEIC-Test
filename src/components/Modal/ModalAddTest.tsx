import { Box, Button, ComboboxData, Modal, Select, Text, TextInput } from '@mantine/core';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGetBooksQuery } from 'store/services/bookApi';
import { useAddQuestionsMutation } from 'store/services/questionApi';
import { useAddTestMutation } from 'store/services/testApi';
import { Exam, ModalAddProps } from 'types';

type ApiResponse = {
  data?: {
    test: {
      id: string;
    };
  };
  error?: FetchBaseQueryError | SerializedError;
};

const ModalAddTest = (props: ModalAddProps) => {
  const { open, onClose } = props;

  const { data: booksData } = useGetBooksQuery({});
  const [selectedBook, setSelectedBook] = useState<string | null>('');

  const [addTest, { isSuccess }] = useAddTestMutation();
  const [addQuestions] = useAddQuestionsMutation();

  const [testTitle, setTestTitle] = useState<string>('');
  const [audioUrlTest, setAudioUrlTest] = useState<string | undefined>('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Add Test successfully');
      onClose();
    }
  }, [isSuccess]);

  const handleFileUpload = (event: any) => {
    const files = event.target?.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      setAudioFile(file);
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string' || result === null) {
          setAudioUrlTest(result || '');
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAdd = async () => {
    const book = booksData?.books.find((book: Exam) => book.title === selectedBook);
    const formData = new FormData();
    const formDataExcel = new FormData();

    if (audioFile) {
      formData.append('file', audioFile);
    }

    if (file) {
      formDataExcel.append('excel', file);
    }

    formData.append('title', testTitle);
    formData.append('bookId', book?.id || '');

    try {
      const res: ApiResponse = await addTest(formData);
      const testId = res.data?.test.id;
      if (testId) {
        formDataExcel.append('test_id', testId);
        await addQuestions(formDataExcel);
      }
    } catch (error) {
      console.error('Error adding test:', error);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <Modal opened={open} onClose={onClose} title="Create book" className="select-none">
      <Select
        checkIconPosition="right"
        placeholder="Select book"
        data={booksData?.books.map((book: Exam) => book.title) as ComboboxData}
        value={selectedBook}
        onChange={setSelectedBook}
        clearable
        mt={16}
      />
      <TextInput
        value={testTitle}
        onChange={(event) => setTestTitle(event.currentTarget.value)}
        size="md"
        placeholder="Enter title..."
        name="title"
        mt={16}
        mb={8}
      />
      {audioUrlTest ? (
        <Box mt={16}>
          <audio controls className="mb-8">
            <source src={audioUrlTest} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </Box>
      ) : (
        <input
          id={`upload-audio`}
          accept="audio/*"
          type="file"
          onChange={(event) => handleFileUpload(event)}
        />
      )}
      <Text>File nội dung (Excel)</Text>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />

      <Button onClick={handleAdd} mt={16}>
        Add
      </Button>
    </Modal>
  );
};

export default ModalAddTest;
