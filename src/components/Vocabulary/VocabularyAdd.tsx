import { ActionIcon, Box, Card, Divider, Group, TextInput, Textarea, Title } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { ChangeEvent } from 'react';
import { VocabularyAddProps } from 'types';

const VocabularyAdd = (props: VocabularyAddProps) => {
  const { order, card, onDelete, onChange } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    onChange(card.id, name, value);
  };

  return (
    <Card mt={32}>
      <Group justify="space-between">
        <Title order={2}>{order}</Title>
        <Group>
          <ActionIcon size={30} variant="filled" color="red" onClick={() => onDelete(card.id)}>
            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Group>
      <Divider my="md" />
      <Box>
        <TextInput size="md" label="Vocabulary" name="title" onChange={handleChange} />
        <Textarea size="md" label="Mean" name="mean" onChange={handleChange} />
      </Box>
    </Card>
  );
};

export default VocabularyAdd;
