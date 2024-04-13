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
  Paper
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NAV_LINKS } from 'constants/constant';
import logo from 'assets/images/logo.png';

// const StyledHeader = styled(Paper)<PaperProps>`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
// `;

const CommonHeader = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  // const [active, setActive] = useState(0);

  const mainItems = NAV_LINKS.map((item, index) => (
    <Anchor
      key={index}
      href={item.link}
      // data-active={active === index || undefined}
      // onClick={(event) => {
      //   event.preventDefault();
      //   setActive(index);
      // }}
      c="grey"
      td="none">
      {item.title}
    </Anchor>
  ));

  return (
    <Paper p="md" shadow="md" mb={80} px="xl">
      <header>
        <Group justify="space-between" h="100%">
          <Group>
            <img src={logo} alt="image error" width={100} />
            <Title order={3}>TOIEC Test</Title>
          </Group>

          <Group visibleFrom="md">
            <Group display="flex">{mainItems}</Group>
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
