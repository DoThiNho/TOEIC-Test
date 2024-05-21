import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Group, Modal, Select, Text, TextInput } from '@mantine/core';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { flashcardAddListSchema, flashcardSchema } from 'schemas';
import { RootState, useAppSelector } from 'store/index';
import {
  useAddGroupVocabularyMutation,
  useAddVocabulariesMutation
} from 'store/services/vocabularyApi';
import { ModalAddVocabularyProps } from 'types';

const ModalAddVocabulary = (props: ModalAddVocabularyProps) => {
  const { text, words, open, onClose } = props;
  const { userDetail } = useAppSelector((state: RootState) => state.user);

  const [addVocabularies, { isSuccess }] = useAddVocabulariesMutation();
  const [addGroupVocabulary, { isSuccess: isSuccessAddGroupVocabulary }] =
    useAddGroupVocabularyMutation();
  const [isCreateListNewWord, setIsCreateListNewWord] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const selectData = words.map((word) => ({
    value: word.id ?? '',
    label: word.title ?? ''
  }));

  useEffect(() => {
    if (isSuccess || isSuccessAddGroupVocabulary) {
      onClose();
    }
  }, [isSuccess, isSuccessAddGroupVocabulary]);

  return (
    <Modal opened={open} onClose={onClose} title="Create Flashcard" className="select-none">
      <Group mt={32} align="center">
        <Text>List Words</Text>
        <Button
          variant="light"
          leftSection={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => setIsCreateListNewWord(!isCreateListNewWord)}>
          Create new
        </Button>
      </Group>
      <Box>
        {isCreateListNewWord ? (
          <Formik
            initialValues={{ title: '', description: '', vocabulary: text, mean: '' }}
            validationSchema={isCreateListNewWord ? flashcardAddListSchema : flashcardSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await addGroupVocabulary({
                  title: values.title,
                  description: values.description,
                  user_id: userDetail?.id,
                  vocabularies: [
                    {
                      vocabulary: values.vocabulary,
                      mean: values.mean
                    }
                  ]
                });
              } catch (err) {}
              setSubmitting(false);
            }}>
            {({ values, errors, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Box mt={16} p={8} className="bg-[#f8f9fa] border">
                  <Text>Create list new word</Text>
                  <TextInput
                    size="md"
                    placeholder="Enter title..."
                    name="title"
                    my={16}
                    value={values.title}
                    onChange={handleChange}
                    error={errors.title}
                  />
                  <TextInput
                    size="md"
                    placeholder="Enter description..."
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    error={errors.description}
                  />
                </Box>
                <Select
                  placeholder="Pick value"
                  data={selectData}
                  value={selectedValue}
                  onChange={(value) => {
                    setSelectedValue(value);
                    setFieldValue('vocabulary', value);
                  }}
                  allowDeselect
                  mt="md"
                />
                <Text mt={32}>New Word</Text>
                <TextInput
                  size="md"
                  placeholder="Enter vocabulary..."
                  name="vocabulary"
                  my={16}
                  value={text}
                  onChange={handleChange}
                  error={errors.vocabulary}
                />
                <TextInput
                  size="md"
                  placeholder="Enter mean..."
                  name="mean"
                  value={values.mean}
                  onChange={handleChange}
                  error={errors.mean}
                />

                <Button mt="md" size="md" fullWidth type="submit" disabled={isSubmitting}>
                  Add FlashCard
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{ vocabulary: text, mean: '' }}
            validationSchema={isCreateListNewWord ? flashcardAddListSchema : flashcardSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await addVocabularies({
                  title: values.vocabulary,
                  mean: values.mean,
                  group_vocabularies_id: selectedValue
                });
              } catch (err) {}
              setSubmitting(false);
            }}>
            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Select
                  placeholder="Pick value"
                  data={selectData}
                  value={selectedValue}
                  onChange={(value) => {
                    setSelectedValue(value);
                  }}
                  allowDeselect
                  mt="md"
                />
                <Text mt={32}>New Word</Text>
                <TextInput
                  size="md"
                  placeholder="Enter vocabulary..."
                  name="vocabulary"
                  my={16}
                  value={values.vocabulary}
                  onChange={handleChange}
                  error={errors.vocabulary}
                />
                <TextInput
                  size="md"
                  placeholder="Enter mean..."
                  name="mean"
                  value={values.mean}
                  onChange={handleChange}
                  error={errors.mean}
                />

                <Button mt="md" size="md" fullWidth type="submit" disabled={isSubmitting}>
                  Add FlashCard
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </Box>
    </Modal>
  );
};

export default ModalAddVocabulary;
