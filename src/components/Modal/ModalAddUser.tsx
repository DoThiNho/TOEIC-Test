import { Modal } from '@mantine/core';
import FormAddUser from 'components/Form/FormAddUser';
import { ModalAddProps } from 'types';

const ModalAddUser = (props: ModalAddProps) => {
  const { open, onClose } = props;

  return (
    <Modal opened={open} onClose={onClose} title="Create User" className="select-none">
      <FormAddUser close={onClose} />
    </Modal>
  );
};

export default ModalAddUser;
