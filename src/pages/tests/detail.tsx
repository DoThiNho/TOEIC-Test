import { Container, Tabs, Text, Title } from '@mantine/core';
import CommonHeader from 'components/common/CommonHeader';
import { useParams } from 'react-router-dom';

const TestDetail = () => {
  const param = useParams();
  console.log({ param });
  return (
    <>
      <CommonHeader />
      <Container size="xl" pt={150}>
        <Title order={3}>ETS 2022 TOIEC TEST 1</Title>
        <Tabs color="teal" defaultValue="first">
          <Tabs.List>
            <Tabs.Tab value="first" color="blue">
              Test
            </Tabs.Tab>
            <Tabs.Tab value="second" color="blue">
              Answer / Transcript
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first" pt="xs">
            <Text>Thời gian làm bài: 120 phút | 7 phần thi | 200 câu hỏi | 2504 bình luận</Text>
          </Tabs.Panel>

          <Tabs.Panel value="second" pt="xs">
            <Text>See exam answers</Text>
            <Text>Exam sections:</Text>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
};

export default TestDetail;
