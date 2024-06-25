import CommonProfile from 'components/Common/CommonProfile';
import { RootState, useAppSelector } from 'store/index';

const AdminProfile = () => {
  const { userDetail } = useAppSelector((state: RootState) => state.user);
  return <CommonProfile userDetail={userDetail} />;
};

export default AdminProfile;
