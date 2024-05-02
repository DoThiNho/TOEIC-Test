import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Checkbox, Flex, Select, Tabs, Text } from '@mantine/core';

const TabTypeTest = () => {
  const timeIntervals = Array.from({ length: 26 }, (_, index) => `${(index + 1) * 5} minutes`);

  return (
    <Tabs radius="lg" color="teal" defaultValue="practice" mt="xl">
      <Tabs.List className="border-b-0 font-semibold" my={16}>
        <Tabs.Tab value="practice" color="blue">
          Practice
        </Tabs.Tab>
        <Tabs.Tab value="fulltest" color="blue">
          Full Test
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="practice" pt="xs">
        <Flex gap={8} bg="teal.1" c="teal.9" fw="bold" p={16}>
          <FontAwesomeIcon icon={faLightbulb} />
          <Text>
            Pro tip: Practicing each section individually and selecting an appropriate time limit
            will help you focus on answering the questions correctly instead of feeling pressured to
            complete the entire test.
          </Text>
        </Flex>
        <Checkbox.Group
          size="lg"
          defaultValue={[]}
          label="Select the test you want to take"
          flex="column"
          my={16}>
          <Flex direction="column" mt="xs" gap={16}>
            <Checkbox radius="sm" size="md" value="1" label="Part 1 (6 questions)" />
            <Checkbox radius="sm" size="md" value="2" label="Part 2 (25 questions)" />
            <Checkbox radius="sm" size="md" value="3" label="Part 3 (39 questions)" />
            <Checkbox radius="sm" size="md" value="4" label="Part 4 (30 questions)" />
            <Checkbox radius="sm" size="md" value="5" label="Part 5 (30 questions)" />
            <Checkbox radius="sm" size="md" value="6" label="Part 6 (16 questions)" />
            <Checkbox radius="sm" size="md" value="7" label="Part 7 (54 questions)" />
          </Flex>
        </Checkbox.Group>
        <Select
          label="Time limit (Leave blank for unlimited time)"
          placeholder="Pick time"
          size="md"
          clearable
          mb="xs"
          data={timeIntervals}
        />
        <Button variant="filled">Practice</Button>
      </Tabs.Panel>

      <Tabs.Panel value="fulltest" pt="xs">
        <Flex gap={8} align="center" bg="yellow.1" c="yellow.8" fw="bold" p={16} mb="lg">
          <FontAwesomeIcon icon={faCircleExclamation} />
          <Text>
            Ready to start the full test? For best results, allocate 120 minutes for this test.
          </Text>
        </Flex>
        <Button size="md" variant="filled">
          Start
        </Button>
      </Tabs.Panel>
    </Tabs>
  );
};

export default TabTypeTest;
