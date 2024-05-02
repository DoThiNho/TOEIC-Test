import CommonFooter from 'components/Common/CommonFooter';
import CommonHeader from 'components/Common/CommonHeader';
import CommonHero from 'components/Common/CommonHero';
import ExamHomePage from 'components/Exam/ExamHomePage';

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
