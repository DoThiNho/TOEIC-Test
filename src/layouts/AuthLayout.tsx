import CommonHeader from 'components/Common/CommonHeader';
import { LayoutProps } from 'types';

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className="main-layout">
      <CommonHeader />
      <div className="content">
        <main className="main">{children}</main>
      </div>
    </div>
  );
};

export default AuthLayout;
