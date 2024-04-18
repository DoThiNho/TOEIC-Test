import CommonFooter from 'components/common/CommonFooter';
import CommonHeader from 'components/common/CommonHeader';
import ExamListTestsPage from 'components/exam/ExamListTestsPage';
import ResultTestsPage from 'components/result/ResultTestsPage';

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
