import CommonHeader from 'components/Common/CommonHeader';
import { ToastContainer } from 'react-toastify';
import { LayoutProps } from 'types';

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className="main-layout">
      <CommonHeader />
      <div className="content">
        <main className="main">{children}</main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthLayout;
