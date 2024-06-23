import { Anchor, Box, Group, Paper, Text, Title } from '@mantine/core';
import Logo from 'assets/images/logo.png';

const PageNotFound = () => {
  return (
    <Box>
      <Paper p="md" shadow="md" px="xl">
        <Group>
          <Anchor href="/">
            <img src={Logo} alt="image error" width={100} />
          </Anchor>
          <Title order={3}>TOIEC Test</Title>
        </Group>
      </Paper>
      <Group className="flex-col" h="100vh" mt={128}>
        <Title size="9rem">404</Title>
        <Text size="3rem">Page not found</Text>
      </Group>
    </Box>
  );
};

export default PageNotFound;
