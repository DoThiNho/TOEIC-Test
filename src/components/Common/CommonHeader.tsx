import {
  Group,
  Button,
  Anchor,
  Divider,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Title,
  Paper,
  Menu,
  Avatar
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { NAV_LINKS } from 'constants/constant';
import { localStorageClient } from 'utils/localStorage.util';
import Logo from 'assets/images/logo.png';
import UserIcon from 'assets/images/user_icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useGetUserQuery } from 'store/services/userApi';
import { AppDispatch, RootState, useAppSelector } from 'store/index';
import { setUserDetail } from 'store/slices/userSlice';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

const CommonHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const token = localStorageClient.getItem('token');
  const { data } = useGetUserQuery(token);
  const { userDetail } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    if (data && _.isEmpty(userDetail)) {
      dispatch(setUserDetail(data.user));
    }
  }, [data]);

  const mainItems = NAV_LINKS.map((item, index) => (
    <Anchor key={index} href={item.link} className="text-gray-500">
      {item.title}
    </Anchor>
  ));

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  const handleLogOut = () => {
    localStorageClient.removeItem('token');
    navigate('/login');
  };

  return (
    <Paper p="md" shadow="md" px="xl" className="fixed top-0 w-full z-10">
      <header>
        <Group justify="space-between" h="100%">
          <Group>
            <Anchor href="/">
              <img src={Logo} alt="image error" width={100} />
            </Anchor>
            <Title order={3}>TOIEC Test</Title>
          </Group>

          <Group visibleFrom="md">
            {token ? (
              <>
                <Group display="flex">{mainItems}</Group>
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
                      onClick={() => navigate('/account')}>
                      Profile
                    </Menu.Item>
                    <Menu.Item
                      onClick={handleLogOut}
                      leftSection={<FontAwesomeIcon icon={faRightFromBracket} />}>
                      Log Out
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </>
            ) : (
              <>
                <Button variant="default">
                  <Anchor href="/login" underline="never" c="black">
                    Sign in
                  </Anchor>
                </Button>
                <Button>
                  <Anchor href="/register" underline="never" c="white">
                    Sign up
                  </Anchor>
                </Button>
              </>
            )}
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="MENU"
        hiddenFrom="md"
        zIndex={1000000}>
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <Group px={16} style={{ flexDirection: 'column', alignItems: 'start' }}>
            {mainItems}
          </Group>
          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">
              <Anchor href="/login" c="black">
                Sign in
              </Anchor>
            </Button>
            <Button>
              <Anchor href="/register" c="white">
                Sign up
              </Anchor>
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Paper>
  );
};

export default CommonHeader;
