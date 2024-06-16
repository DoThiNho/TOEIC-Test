import { AppShell, Avatar, Burger, Group, Menu, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import UserIcon from 'assets/images/user_icon.png';
import { useGetUserQuery } from 'store/services/userApi';
import { localStorageClient } from 'utils/localStorage.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SideBar } from 'components/SideBar/SideBar';
import { ToastContainer } from 'react-toastify';
import { useAppSelector, RootState, AppDispatch } from 'store/index';
import { setUserDetail } from 'store/slices/userSlice';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { LayoutProps } from 'types';

const AdminLayout = ({ children }: LayoutProps) => {
  const [opened, { toggle }] = useDisclosure();
  const token = localStorageClient.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { data } = useGetUserQuery(token || '');
  const [activeLink, setActiveLink] = useState('Users');

  const { userDetail } = useAppSelector((state: RootState) => state.user);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/admin/exams')) {
      setActiveLink('Exams');
    } else {
      setActiveLink('Users');
    }
  }, [location]);

  useEffect(() => {
    if (data && _.isEmpty(userDetail)) {
      dispatch(setUserDetail(data.data || {}));
    }
  }, [data]);

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
                src={data?.data?.image ? data?.data.image : UserIcon}
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
      <AppShell.Main>{children}</AppShell.Main>
      <ToastContainer />
    </AppShell>
  );
};

export default AdminLayout;
