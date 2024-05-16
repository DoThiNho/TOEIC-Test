import { Button, Group, Modal, Text } from '@mantine/core';
import { ModalConfirmProps } from 'types';

const ModalConfirm = (props: ModalConfirmProps) => {
  const { text, open, onClose, handleConfirm } = props;

  return (
    <Modal opened={open} onClose={onClose}>
      <Text fw={700} size="lg" ta="center" mb={32}>
        {text}
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

export default ModalConfirm;
