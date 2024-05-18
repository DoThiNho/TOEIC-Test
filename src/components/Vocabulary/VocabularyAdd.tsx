import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, Card, Divider, Grid, GridCol, Group, TextInput, Title } from '@mantine/core';
import { VocabularyAddProps } from 'types';

const VocabularyAdd = (props: VocabularyAddProps) => {
  const { order, card, onDelete, onChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    onChange(card.id, name, value);
  };

  return (
    <Card mt={32}>
      <Group justify="space-between">
        <Title order={2}>{order}</Title>
        <Group>
          <ActionIcon size={42} variant="default" onClick={() => onDelete(card.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </ActionIcon>
        </Group>
      </Group>
      <Divider my="md" />
      <Grid>
        <GridCol span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput size="md" label="Vocabulary" name="title" onChange={handleChange} />
        </GridCol>
        <GridCol span={{ base: 12, md: 6, lg: 6 }}>
          <TextInput size="md" label="Mean" name="mean" onChange={handleChange} />
        </GridCol>
      </Grid>
    </Card>
  );
};

export default VocabularyAdd;
