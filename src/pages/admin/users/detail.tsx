import { Tabs } from '@mantine/core';
import _ from 'lodash';
import CommonProfile from 'components/Common/CommonProfile';
import { useParams } from 'react-router-dom';
import ResultUser from 'components/Result/ResultUser';

const UserDetail = () => {
  const param = useParams();
  const { id } = param;

  return (
    <Tabs color="teal" defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first">Profile</Tabs.Tab>
        <Tabs.Tab value="second">Achievement</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first" pt="xs" mt={64}>
        <CommonProfile />
      </Tabs.Panel>

      <Tabs.Panel value="second" pt="xs">
        <ResultUser id={id || ''} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default UserDetail;
