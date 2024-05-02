import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Pagination,
  Select,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import ExamList from './ExamList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const ExamListTestsPage = () => {
  return (
    <Container size="xl">
      <Box>
        <Title order={1} ta="center" mb={32}>
          Exams
        </Title>
        <Group justify="space-between" mb={32}>
          <Group>
            <Text>Ets: </Text>
            <Select
              placeholder="Pick version"
              data={['2024', '2023', '2022', '2021', '2020', '2019', '2018']}
              defaultValue="React"
              clearable
            />
          </Group>
          <Group>
            <TextInput
              rightSectionPointerEvents="none"
              rightSection={<FontAwesomeIcon icon={faSearch} />}
              placeholder="Enter test"
            />
            <Button variant="filled">Search</Button>
          </Group>
        </Group>
        <ExamList />
        <Flex justify="center">
          <Pagination total={2} mt={32} />
        </Flex>
      </Box>
    </Container>
  );
};

export default ExamListTestsPage;
