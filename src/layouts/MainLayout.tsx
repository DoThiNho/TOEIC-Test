import CommonFooter from 'components/Common/CommonFooter';
import CommonHeader from 'components/Common/CommonHeader';
import { ToastContainer } from 'react-toastify';
import { LayoutProps } from 'types';

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className="main-layout">
      <CommonHeader />
      <div className="content">
        <main className="main">{children}</main>
      </div>
      <CommonFooter />
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
