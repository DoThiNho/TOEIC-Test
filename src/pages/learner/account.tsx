import CommonProfile from 'components/Common/CommonProfile';
import { RootState, useAppSelector } from 'store/index';

const Profile = () => {
  const { userDetail } = useAppSelector((state: RootState) => state.user);

  return <CommonProfile userDetail={userDetail} />;
};

export default Profile;
