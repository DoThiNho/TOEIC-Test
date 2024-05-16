import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Anchor, Container, Group, List, Tabs, Text, Title } from '@mantine/core';
import CommonHeader from 'components/Common/CommonHeader';
import TableResult from 'components/Table/TableResult';
import TabTypeTest from 'components/Tabs/TabTypeTest';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetResultByTestIdQuery } from 'store/services/resultApi';
import { useGetTestQuery } from 'store/services/testApi';
import { TableData, Test } from 'types';

const TestDetail = () => {
  const param = useParams();

  const { data: testDetail } = useGetTestQuery(param.id);
  const { data: results } = useGetResultByTestIdQuery(param.id);

  const [test, setTest] = useState<Test>({});
  const [listResult, setListResult] = useState<TableData[]>([]);

  useEffect(() => {
    if (testDetail?.data) {
      setTest(testDetail.data);
    }
  }, [testDetail]);

  useEffect(() => {
    if (results?.data) {
      setListResult(results.data);
    }
  }, [results]);

  return (
    <>
      <CommonHeader />
      <Container size="md" pt={150} pb={32}>
        <Title order={2}>
          {test.book_title} TOIEC {test.title}
        </Title>
        <Tabs variant="pills" radius="lg" color="teal" defaultValue="first">
          <Tabs.List className="border-b-0 font-semibold" my={16}>
            <Tabs.Tab value="first" color="blue">
              Test
            </Tabs.Tab>
            <Tabs.Tab value="second" color="blue">
              Answer / Transcript
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first" pt="xs">
            <Group>
              <FontAwesomeIcon icon={faClock} />
              <Text>Exam time: 120 minutes | 7 exam parts | 200 questions</Text>
            </Group>
            <Text className="text-orange-600 italic" my={32}>
              Note: To be converted to scaled score (for example on a scale of 990 for TOEIC or 9.0
              for IELTS), please select FULL TEST mode.
            </Text>
            <TableResult data={listResult} />
            <TabTypeTest items={test.parts || []} testId={test.id} />
          </Tabs.Panel>

          <Tabs.Panel value="second" pt="xs">
            <Text mb="lg">Exam sections:</Text>
            <List>
              <List.Item>
                Part 1 : <Anchor href="/">See answer</Anchor>
              </List.Item>
              <List.Item>
                Part 2 : <Anchor href="/">See answer</Anchor>
              </List.Item>
              <List.Item>
                Part 3 : <Anchor href="/">See answer</Anchor>
              </List.Item>
              <List.Item>
                Part 4 : <Anchor href="/">See answer</Anchor>
              </List.Item>
              <List.Item>
                Part 5 : <Anchor href="/">See answer</Anchor>
              </List.Item>
              <List.Item>
                Part 6 : <Anchor href="/">See answer</Anchor>
              </List.Item>
              <List.Item>
                Part 7 : <Anchor href="/">See answer</Anchor>
              </List.Item>
            </List>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
};

export default TestDetail;
