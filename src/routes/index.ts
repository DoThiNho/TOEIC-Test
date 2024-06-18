import Home from 'pages/home';
import SignIn from 'pages/login';
import SignUp from 'pages/register';
import Account from 'pages/learner/account';
import Tests from 'pages/learner/tests';
import TestDetail from 'pages/learner/tests/detail';
import TestQuestions from 'pages/learner/tests/questions';
import ResultExam from 'pages/learner/tests/results';
import Results from 'pages/learner/results';
import ResultPart from 'pages/learner/tests/result-part';
import FlashCards from 'pages/learner/flashcards';
import AddFlashCards from 'pages/learner/flashcards/add';
import FlashCardDetail from 'pages/learner/flashcards/detail';
import Admin from 'pages/admin';
import Users from 'pages/admin/users';
import UserAdd from 'pages/admin/users/add';
import UserDetail from 'pages/admin/users/detail';
import Exams from 'pages/admin/exams';
import ExamDetail from 'pages/admin/exams/detail';
import AdminProfile from 'pages/admin/account';

const routes = [
  {
    path: '/login',
    component: SignIn,
    layout: 'auth'
  },
  {
    path: '/register',
    component: SignUp,
    layout: 'auth'
  },
  {
    path: '/',
    component: Home,
    layout: 'main'
  },
  {
    path: '/learner/account',
    component: Account,
    layout: 'main'
  },
  {
    path: '/learner/tests',
    component: Tests,
    layout: 'main'
  },
  {
    path: '/learner/tests/:id',
    component: TestDetail,
    layout: 'main'
  },
  {
    path: '/learner/tests/:id/:type',
    component: TestQuestions,
    layout: 'main'
  },
  {
    path: '/learner/tests/:id/results/:idResult',
    component: ResultExam,
    layout: 'main'
  },
  {
    path: '/learner/results',
    component: Results,
    layout: 'main'
  },
  {
    path: '/learner/tests/:testId/part',
    component: ResultPart,
    layout: 'main'
  },
  {
    path: '/learner/flashcards',
    component: FlashCards,
    layout: 'main'
  },
  {
    path: '/learner/flashcards/:id',
    component: FlashCardDetail,
    layout: 'main'
  },
  {
    path: '/learner/flashcards/create',
    component: AddFlashCards,
    layout: 'main'
  },
  {
    path: '/admin',
    component: Admin,
    layout: 'admin'
  },
  {
    path: '/admin/users',
    component: Users,
    layout: 'admin'
  },
  {
    path: '/admin/users/add',
    component: UserAdd,
    layout: 'admin'
  },
  {
    path: '/admin/users/:id',
    component: UserDetail,
    layout: 'admin'
  },
  {
    path: '/admin/exams',
    component: Exams,
    layout: 'admin'
  },
  {
    path: '/admin/exams/:id',
    component: ExamDetail,
    layout: 'admin'
  },
  {
    path: '/admin/account',
    component: AdminProfile,
    layout: 'admin'
  }
];

export default routes;
