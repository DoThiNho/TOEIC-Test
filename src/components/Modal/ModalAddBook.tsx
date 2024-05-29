import { Button, Modal, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAddBookMutation } from 'store/services/bookApi';
import { ModalAddProps } from 'types';

const ModalAddBook = (props: ModalAddProps) => {
  const { open, onClose } = props;
  const [addBook, { isSuccess }] = useAddBookMutation();

  const [title, setTitle] = useState('');

  useEffect(() => {
    if (isSuccess) {
      toast.success('Add book successfully');
      setTitle('');
      onClose();
    }
  }, [isSuccess]);

  const handleAdd = async () => {
    await addBook(title);
    onClose();
  };

  return (
    <Modal opened={open} onClose={onClose} title="Create book" className="select-none">
      <TextInput
        size="md"
        label="Name Book"
        placeholder="Enter name book"
        name="name"
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
      />
      <Button onClick={handleAdd}>Add</Button>
    </Modal>
  );
};

export default ModalAddBook;
