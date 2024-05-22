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

const routes = [
  {
    path: '/login',
    component: SignIn
  },
  {
    path: '/register',
    component: SignUp
  },
  {
    path: '/',
    component: Home
  },
  {
    path: '/learner/account',
    component: Account
  },
  {
    path: '/learner/tests',
    component: Tests
  },
  {
    path: '/learner/tests/:id',
    component: TestDetail
  },
  {
    path: '/learner/tests/:id/:type',
    component: TestQuestions
  },
  {
    path: '/learner/tests/:id/results/:idResult',
    component: ResultExam
  },
  {
    path: '/learner/results',
    component: Results
  },
  {
    path: '/learner/tests/:testId/part',
    component: ResultPart
  },
  {
    path: '/learner/flashcards',
    component: FlashCards
  },
  {
    path: '/learner/flashcards/:id',
    component: FlashCardDetail
  },
  {
    path: '/learner/flashcards/create',
    component: AddFlashCards
  },
  {
    path: '/admin',
    component: Admin
  },
  {
    path: '/admin/users',
    component: Users
  },
  {
    path: '/admin/users/add',
    component: UserAdd
  },
  {
    path: '/admin/users/:id',
    component: UserDetail
  }
];

export default routes;
