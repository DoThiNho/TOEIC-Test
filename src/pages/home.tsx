import CommonFooter from 'components/common/CommonFooter';
import CommonHeader from 'components/common/CommonHeader';
import CommonHero from 'components/common/CommonHero';
import ExamHomePage from 'components/exam/ExamHomePage';

const Home = () => {
  return (
    <>
      <CommonHeader />
      <CommonHero />
      <ExamHomePage />
      <CommonFooter />
    </>
  );
};

export default Home;
