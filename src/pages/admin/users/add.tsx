import { AppShell, Avatar, Box, Burger, Group, Menu, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import UserIcon from 'assets/images/user_icon.png';
import { useGetUserQuery } from 'store/services/userApi';
import { localStorageClient } from 'utils/localStorage.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { SideBar } from 'components/SideBar/SideBar';
import FormSignUp from 'components/Form/FormSignUp';
import { useState } from 'react';

const UserAdd = () => {
  const [opened, { toggle }] = useDisclosure();
  const token = localStorageClient.getItem('token');
  const navigate = useNavigate();

  const { data } = useGetUserQuery(token);
  const [activeLink, setActiveLink] = useState('Users');

  const handleLogOut = () => {
    localStorageClient.removeItem('token');
    navigate('/login');
    setActiveLink('');
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3}>Admin</Title>
          <Menu>
            <Menu.Target>
              <Avatar
                src={data?.user.image ? data?.user.image : UserIcon}
                size={40}
                alt="it's me"
                className="cursor-pointer"
              />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<FontAwesomeIcon icon={faUser} />}
                onClick={() => navigate('/admin/account')}>
                Profile
              </Menu.Item>
              <Menu.Item
                onClick={handleLogOut}
                leftSection={<FontAwesomeIcon icon={faRightFromBracket} />}>
                Log Out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <SideBar activeLink={activeLink} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Group justify="center">
          <Box w="30%">
            <FormSignUp />
          </Box>
        </Group>
      </AppShell.Main>
    </AppShell>
  );
};

export default UserAdd;
