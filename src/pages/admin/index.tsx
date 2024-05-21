import { AppShell, Avatar, Box, Burger, Group, Menu, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAppSelector, RootState, AppDispatch } from 'store/index';
import UserIcon from 'assets/images/user_icon.png';
import { useGetUserQuery } from 'store/services/userApi';
import { localStorageClient } from 'utils/localStorage.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { setUserDetail } from 'store/slices/userSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

const Admin = () => {
  const [opened, { toggle }] = useDisclosure();
  const token = localStorageClient.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { data } = useGetUserQuery(token);
  const { userDetail } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    if (data && _.isEmpty(userDetail)) {
      dispatch(setUserDetail(data.user));
    }
  }, [data]);

  const handleLogOut = () => {
    localStorageClient.removeItem('token');
    navigate('/login');
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
                mx="auto"
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
        <Box>Users</Box>
        <Box>Books</Box>
        <Box>Tests</Box>
      </AppShell.Navbar>
      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
};

export default Admin;
