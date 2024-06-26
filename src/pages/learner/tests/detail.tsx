import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Anchor, Button, Container, Group, List, Tabs, Text, Title } from '@mantine/core';
import TableResult from 'components/Table/TableResult';
import TabTypeTest from 'components/Tabs/TabTypeTest';
import { API_URL } from 'constants/constant';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useGetResultByTestIdQuery } from 'store/services/resultApi';
import { useGetTestQuery } from 'store/services/testApi';
import { TableData, Test } from 'types';

const socket = io(API_URL);

const TestDetail = () => {
  const param = useParams();
  const navigate = useNavigate();

  const { data: testDetail } = useGetTestQuery(param.id);
  const { data: results, refetch } = useGetResultByTestIdQuery(param.id);

  const [test, setTest] = useState<Test>({});
  const [listResult, setListResult] = useState<TableData[]>([]);

  useEffect(() => {
    socket.on('change-result', () => {
      refetch();
    });
  }, []);

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
      <Container size="md" pt={50} pb={32}>
        <Group justify="space-between">
          <Title order={2}>
            {test.book_title} TOEIC {test.title}
          </Title>
          <Button
            variant="light"
            leftSection={<FontAwesomeIcon icon={faArrowLeft} />}
            onClick={() => navigate('/')}>
            Go back
          </Button>
        </Group>
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
              {test?.parts?.map((part, index) => (
                <List.Item key={index}>
                  Part {part.part_num} :{' '}
                  <Anchor href={`/learner/tests/${test.id}/part?part=${part.part_num}`}>
                    See answer
                  </Anchor>
                </List.Item>
              ))}
            </List>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
};

export default TestDetail;
