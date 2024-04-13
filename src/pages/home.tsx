import CommonFooter from 'components/common/CommonFooter';
import CommonHero from 'components/common/CommonHero';
import ExamList from 'components/exam/ExamList';

const Home = () => {
  return (
    <>
      <CommonHero />
      <ExamList />
      <CommonFooter />
    </>
  );
};

export default Home;
