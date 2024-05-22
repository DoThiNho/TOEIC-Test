import { useEffect, useState } from 'react';
import { Table, Checkbox, ActionIcon, Group, Box, TextInput, Title, Button } from '@mantine/core';
import { useDeleteUerByIdMutation, useGetUsersQuery } from 'store/services/userApi';
import { IUser } from 'types';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { isEmpty } from 'lodash';
import ModalConfirmDelete from 'components/Modal/ModalConfirmDelete';
import { useDisclosure } from '@mantine/hooks';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ModalAddUser from 'components/Modal/ModalAddUser';

function TableUser() {
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { data } = useGetUsersQuery({});
  const [users, setUsers] = useState<IUser[]>([]);
  const [valueSearch, setValueSearch] = useState<string>('');
  const [opened, { open, close }] = useDisclosure(false);
  const [openedModalAdd, { open: openModalAdd, close: closeModalAdd }] = useDisclosure(false);
  const [idDel, setIdDel] = useState('');

  const [deleteUerById, { isSuccess }] = useDeleteUerByIdMutation();
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Delete user successfully!');
      close();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isAddSuccess) {
      toast.success('Add user successfully!');
      setIsAddSuccess(false);
    }
  }, [isAddSuccess]);

  const rows = users.map((user) => (
    <Table.Tr
      key={user.id}
      bg={selectedRows.includes(user.id) ? 'var(--mantine-color-blue-light)' : undefined}>
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(user.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, user.id]
                : selectedRows.filter((id) => id !== user.id)
            )
          }
        />
      </Table.Td>
      <Table.Td>{user.first_name}</Table.Td>
      <Table.Td>{user.last_name}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.role_id === '1' ? 'Admin' : 'User'}</Table.Td>
      <Table.Td>{user.register_at}</Table.Td>
      <Table.Td>
        <Group gap={16} justify="center">
          <ActionIcon
            variant="filled"
            color="yellow"
            onClick={() => navigate(`/admin/users/${user.id}`)}>
            <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            color="red"
            onClick={() => {
              setIdDel(user.id);
              open();
            }}>
            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const handleConfirmDelete = async () => {
    await deleteUerById(idDel);
  };

  const handleSearch = (value: string) => {
    setValueSearch(value);
    if (isEmpty(value)) {
      setUsers(data.users);
    } else {
      console.log({ users });
      const usersSearch = users.filter((user) => {
        console.log({ user });
        return (
          user.first_name?.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
          user.last_name?.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
          user.email?.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );
      });
      console.log({ users });
      setUsers(usersSearch);
    }
  };

  console.log({ isAddSuccess, isSuccess });

  return (
    <Box mt={16}>
      <Title order={1} ta="center" mb={32}>
        MANAGER USER
      </Title>
      <Group mb={32} justify="space-between">
        <TextInput
          rightSectionPointerEvents="none"
          rightSection={<FontAwesomeIcon icon={faSearch} />}
          placeholder="Enter name or email"
          value={valueSearch}
          onChange={(event) => handleSearch(event.currentTarget.value)}
        />
        <Button onClick={openModalAdd}>Add User</Button>
      </Group>
      <Table ta="center" striped highlightOnHover withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th ta="center">First Name</Table.Th>
            <Table.Th ta="center">Last Name</Table.Th>
            <Table.Th ta="center">Email</Table.Th>
            <Table.Th ta="center">User Type</Table.Th>
            <Table.Th ta="center">Register At</Table.Th>
            <Table.Th ta="center">Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <ModalConfirmDelete
        text="user"
        open={opened}
        onClose={close}
        handleConfirm={handleConfirmDelete}
      />
      <ModalAddUser
        open={openedModalAdd}
        onClose={closeModalAdd}
        setIsAddSuccess={setIsAddSuccess}
      />
      <ToastContainer />
    </Box>
  );
}

export default TableUser;
