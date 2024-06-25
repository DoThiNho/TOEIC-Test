import { Button, Tabs } from '@mantine/core';
import _ from 'lodash';
import CommonProfile from 'components/Common/CommonProfile';
import { useNavigate, useParams } from 'react-router-dom';
import ResultUser from 'components/Result/ResultUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useGetUserByIdQuery } from 'store/services/userApi';

const UserDetail = () => {
  const param = useParams();
  const navigate = useNavigate();

  const { id } = param;
  const { data: userDetail } = useGetUserByIdQuery(id || '');

  return (
    <Tabs color="teal" defaultValue="first">
      <Button
        variant="light"
        className="float-right"
        leftSection={<FontAwesomeIcon icon={faArrowLeft} />}
        onClick={() => navigate(-1)}>
        Go back
      </Button>
      <Tabs.List>
        <Tabs.Tab value="first">Profile</Tabs.Tab>
        <Tabs.Tab value="second">Achievement</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first" pt="xs" mt={64}>
        <CommonProfile userDetail={userDetail?.data} />
      </Tabs.Panel>

      <Tabs.Panel value="second" pt="xs">
        <ResultUser id={id || ''} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default UserDetail;
