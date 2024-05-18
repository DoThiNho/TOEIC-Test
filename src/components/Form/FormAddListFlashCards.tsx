import { Box, TextInput, Textarea } from '@mantine/core';
import { FormAddListFlashCardsProps } from 'types';

const FormAddListFlashCards = (props: FormAddListFlashCardsProps) => {
  const { title, description, onChange } = props;

  return (
    <Box>
      <TextInput
        size="md"
        placeholder="Enter title..."
        value={title}
        name="title"
        mt={32}
        mb={8}
        onChange={onChange}
      />
      <Textarea
        size="md"
        placeholder="Enter description..."
        value={description}
        name="description"
        onChange={onChange}
      />
    </Box>
  );
};

export default FormAddListFlashCards;
