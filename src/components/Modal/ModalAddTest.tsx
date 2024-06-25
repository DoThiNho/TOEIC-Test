import {
  Box,
  Button,
  ComboboxData,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  Text,
  TextInput
} from '@mantine/core';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { EXCEL_FILE_BASE64 } from 'constants/excel';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGetBooksQuery } from 'store/services/bookApi';
import { useAddQuestionsMutation } from 'store/services/questionApi';
import { useAddTestMutation } from 'store/services/testApi';
import { Exam, ModalAddTestProps } from 'types';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

type ApiResponse = {
  data?: {
    data: {
      id: string;
    };
  };
  error?: FetchBaseQueryError | SerializedError;
};

const ModalAddTest = (props: ModalAddTestProps) => {
  const { open, onClose, bookTitle } = props;
  const { data: booksData } = useGetBooksQuery({});
  const [selectedBook, setSelectedBook] = useState<string | null>(bookTitle);

  const [addTest, { isSuccess: isSuccessAddTest }] = useAddTestMutation();
  const [addQuestions, { isSuccess: isSuccessAddQuestions }] = useAddQuestionsMutation();

  const [testTitle, setTestTitle] = useState<string>('');
  const [audioUrlTest, setAudioUrlTest] = useState<string | undefined>('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddQuestion, setIsAddQuestion] = useState<boolean>(false);
  const requiredColumns = [
    'number',
    'part',
    'image',
    'audio',
    'question',
    'option1',
    'option2',
    'option3',
    'option4',
    'correctanswer'
  ];

  useEffect(() => {
    setSelectedBook(bookTitle);
  }, [bookTitle]);

  useEffect(() => {
    if (isAddQuestion) {
      if (isSuccessAddTest && isSuccessAddQuestions) {
        setIsLoading(false);
        toast.success('Add Test successfully');
        onClose();
      }
    } else {
      if (isSuccessAddTest) {
        setIsLoading(false);
        toast.success('Add Test successfully');
        onClose();
      }
    }
  }, [isSuccessAddTest, isSuccessAddQuestions]);

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
    const book = booksData?.data.find((book: Exam) => book.title === selectedBook);
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
      setIsLoading(true);
      const res: ApiResponse = await addTest(formData);
      const testId = res.data?.data.id;
      if (testId && file) {
        setIsAddQuestion(true);
        formDataExcel.append('test_id', testId);
        const resAddQuestions: ApiResponse = await addQuestions(formDataExcel);
        if (resAddQuestions?.error) {
          toast.error('One or more required column headers are missing or inappropriate.');
          setIsLoading(false);
          onClose();
        }
      }
    } catch (error) {
      console.error('Error adding test:', error);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length > 0) {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);
      checkExcelFile(uploadedFile);
    }
  };

  const checkExcelFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const headers: string[] = [];
        const range = XLSX.utils.decode_range(worksheet['!ref'] || '');

        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cell = worksheet[XLSX.utils.encode_cell({ r: range.s.r, c: C })];
          headers.push(cell.v);
        }

        const missingColumns = requiredColumns.filter((column) => !headers.includes(column));
        if (missingColumns.length > 0) {
          toast.error('One or more required column headers are missing or inappropriate.');
          setFile(null);
        }
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleDownload = () => {
    let sliceSize = 1024;
    let byteCharacters = atob(EXCEL_FILE_BASE64);
    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    let byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      let begin = sliceIndex * sliceSize;
      let end = Math.min(begin + sliceSize, bytesLength);
      let bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    FileSaver.saveAs(new Blob(byteArrays, { type: 'application/vnd.ms-excel' }), 'my-excel.xlsx');
  };

  const isDisableAdd = !selectedBook || !testTitle || !audioUrlTest || !file;

  return (
    <Modal opened={open} onClose={onClose} title="Create test" className="select-none">
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      <Select
        checkIconPosition="right"
        placeholder="Select book"
        data={booksData?.data.map((book: Exam) => book.title) as ComboboxData}
        value={selectedBook}
        onChange={(_value, option) => setSelectedBook(option.value)}
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
      <Group>
        <Text>Audio: </Text>
        <input
          id={`upload-audio`}
          accept="audio/*"
          type="file"
          onChange={(event) => handleFileUpload(event)}
        />
      </Group>
      {audioUrlTest && (
        <Box mt={16}>
          <audio controls className="mb-8">
            <source src={audioUrlTest} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </Box>
      )}

      <Group>
        <Text mt={16}>This is an example template</Text>
        <Button onClick={handleDownload} mt={16}>
          Download
        </Button>
      </Group>

      <Text mt={16}>File nội dung (Excel)</Text>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />

      <Button onClick={handleAdd} mt={16} disabled={isDisableAdd}>
        Add
      </Button>
    </Modal>
  );
};

export default ModalAddTest;
