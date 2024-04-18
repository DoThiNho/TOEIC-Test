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
  Avatar,
  Menu
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NAV_LINKS } from 'constants/constant';
import logo from 'assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

const CommonHeader = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const mainItems = NAV_LINKS.map((item, index) => (
    <Anchor key={index} href={item.link} className="text-gray-500">
      {item.title}
    </Anchor>
  ));

  return (
    <Paper p="md" shadow="md" mb={80} px="xl" className="fixed top-0 w-full z-10">
      <header>
        <Group justify="space-between" h="100%">
          <Group>
            <Anchor href="/">
              <img src={logo} alt="image error" width={100} />
            </Anchor>
            <Title order={3}>TOIEC Test</Title>
          </Group>

          <Group visibleFrom="md">
            <Group display="flex">{mainItems}</Group>
            {/* <Button variant="default">
              <Anchor href="/login" underline="never" c="black">
                Sign in
              </Anchor>
            </Button>
            <Button>
              <Anchor href="/register" underline="never" c="white">
                Sign up
              </Anchor>
            </Button> */}

            <Menu>
              <Menu.Target>
                <Avatar color="cyan" radius="xl" className="cursor-pointer">
                  ND
                </Avatar>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<FontAwesomeIcon icon={faUser} />}>Profile</Menu.Item>
                <Menu.Item leftSection={<FontAwesomeIcon icon={faRightFromBracket} />}>
                  Log Out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
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
