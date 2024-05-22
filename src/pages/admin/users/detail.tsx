import {
  AppShell,
  Avatar,
  Box,
  Burger,
  Flex,
  Grid,
  GridCol,
  Group,
  Menu,
  Tabs,
  Title
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import UserIcon from 'assets/images/user_icon.png';
import { useGetUserByIdQuery, useSetAvatarMutation } from 'store/services/userApi';
import { localStorageClient } from 'utils/localStorage.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';
import { SideBar } from 'components/SideBar/SideBar';
import FormProfile from 'components/Form/FormProfile';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ResultUser from 'components/Result/ResultUser';

const UserDetail = () => {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const param = useParams();
  const { id } = param;
  const [user, setUser] = useState({});

  const { data } = useGetUserByIdQuery(id);
  const [setAvatar, { isSuccess }] = useSetAvatarMutation();

  const [activeLink, setActiveLink] = useState('Users');
  const [imageUrl, setImageUrl] = useState<string | undefined>('');

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Update avatar successfully');
    }
  }, [data]);

  const handleLogOut = () => {
    localStorageClient.removeItem('token');
    navigate('/login');
    setActiveLink('');
  };

  const handleFileUpload = (event: any) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        console.log(result);
        if (typeof result === 'string' || result === null) {
          setImageUrl(result || '');
        }
        if (typeof file === 'undefined') return;
        const newFormData = new FormData();
        newFormData.append('image', file);
        setAvatar(newFormData);
      };
      reader.readAsDataURL(file);
    }
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
        <Tabs color="teal" defaultValue="first">
          <Tabs.List>
            <Tabs.Tab value="first">Profile</Tabs.Tab>
            <Tabs.Tab value="second">Achievement</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first" pt="xs" mt={64}>
            <Grid>
              <GridCol span={{ base: 12, md: 6, lg: 3 }}>
                <Box className="relative">
                  <Avatar src={imageUrl ? imageUrl : UserIcon} size={200} alt="it's me" mx="auto" />
                  <label
                    htmlFor="upload-image"
                    className="cursor-pointer absolute bottom-0 right-[30%]">
                    <FontAwesomeIcon icon={faCamera} />
                    <input
                      id="upload-image"
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleFileUpload}
                    />
                  </label>
                </Box>
              </GridCol>
              <GridCol span={{ base: 12, md: 6, lg: 9 }}>
                <Flex>
                  <Box w="80%">
                    <FormProfile userDetail={user} />
                  </Box>
                </Flex>
              </GridCol>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="second" pt="xs">
            <ResultUser id={id || ''} />
          </Tabs.Panel>
        </Tabs>
      </AppShell.Main>
      <ToastContainer />
    </AppShell>
  );
};

export default UserDetail;
