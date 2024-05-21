import CommonFooter from 'components/Common/CommonFooter';
import CommonHeader from 'components/Common/CommonHeader';
import ExamListTestsPage from 'components/Exam/ExamListTestsPage';
import ResultTestsPage from 'components/Result/ResultTestsPage';

const Tests = () => {
  return (
    <>
      <CommonHeader />
      <ResultTestsPage />
      <ExamListTestsPage />
      <CommonFooter />
    </>
  );
};

export default Tests;
