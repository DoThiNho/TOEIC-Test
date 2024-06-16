import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Checkbox, Flex, Select, Tabs, Text } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PartProps } from 'types';

const TabTypeTest = (props: PartProps) => {
  const { items, testId } = props;

  const navigate = useNavigate();

  const timeIntervals = Array.from({ length: 26 }, (_, index) => `${(index + 1) * 5}`);

  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>('practice');
  const [time, setTime] = useState<string | null>(null);

  const handlePractice = () => {
    if (time) {
      navigate(
        `/learner/tests/${testId}/${activeTab}?part=${selectedParts.join('&part=')}&time_limit=${time}`
      );
    } else {
      navigate(`/learner/tests/${testId}/${activeTab}?part=${selectedParts.join('&part=')}`);
    }
  };

  const handleFullTest = () => {
    navigate(`/learner/tests/${testId}/${activeTab}`);
  };

  return (
    <Tabs value={activeTab} onChange={setActiveTab} radius="lg" color="teal" mt="xl">
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
            {items.map((item) => (
              <Checkbox
                key={item.id}
                radius="sm"
                size="md"
                value={item.part_num}
                label={`Part ${item.part_num}`}
                onChange={(event) => {
                  const { checked, value } = event.currentTarget;
                  setSelectedParts((prevSelectedItems) =>
                    checked
                      ? [...prevSelectedItems, value]
                      : prevSelectedItems.filter((item) => item !== value)
                  );
                }}
              />
            ))}
          </Flex>
        </Checkbox.Group>
        <Select
          label="Time limit (Leave blank for unlimited time)"
          placeholder="Pick time"
          size="md"
          clearable
          mb="xs"
          data={timeIntervals}
          value={time}
          onChange={setTime}
        />
        <Button variant="filled" onClick={handlePractice}>
          Practice
        </Button>
      </Tabs.Panel>

      <Tabs.Panel value="fulltest" pt="xs">
        <Flex gap={8} align="center" bg="yellow.1" c="yellow.8" fw="bold" p={16} mb="lg">
          <FontAwesomeIcon icon={faCircleExclamation} />
          <Text>
            Ready to start the full test? For best results, allocate 120 minutes for this test.
          </Text>
        </Flex>
        <Button size="md" variant="filled" onClick={handleFullTest}>
          Start
        </Button>
      </Tabs.Panel>
    </Tabs>
  );
};

export default TabTypeTest;
