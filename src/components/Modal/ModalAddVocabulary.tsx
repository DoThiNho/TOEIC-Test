import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Group, Modal, Select, Text, TextInput } from '@mantine/core';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { flashcardAddListSchema, flashcardSchema } from 'schemas';
import { ModalAddVocabularyProps } from 'types';

const ModalAddVocabulary = (props: ModalAddVocabularyProps) => {
  const { text, words, open, onClose } = props;

  const [isCreateListNewWord, setIsCreateListNewWord] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const selectData = words.map((word) => ({
    value: word.id ?? '',
    label: word.title ?? ''
  }));

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
        <Formik
          initialValues={{ title: '', description: '', vocabulary: text, mean: '' }}
          validationSchema={isCreateListNewWord ? flashcardAddListSchema : flashcardSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              console.log({ values, selectedValue });
            } catch (err) {}
            setSubmitting(false);
          }}>
          {({ values, errors, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              {isCreateListNewWord ? (
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
              ) : (
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
              )}
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
      </Box>
    </Modal>
  );
};

export default ModalAddVocabulary;
