import { Button, Group, Modal, Text } from '@mantine/core';
import { ModalConfirmProps } from 'types';

const ModalConfirmDelete = (props: ModalConfirmProps) => {
  const { text, open, onClose, handleConfirm } = props;

  return (
    <Modal opened={open} onClose={onClose}>
      <Text fw={700} size="lg" ta="center" mb={32}>
        Do you want to delete this {text} ?
      </Text>
      <Group justify="end">
        <Button variant="filled" onClick={handleConfirm}>
          OK
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </Group>
    </Modal>
  );
};

export default ModalConfirmDelete;
