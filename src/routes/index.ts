import Home from 'pages/home';
import SignIn from 'pages/login';
import SignUp from 'pages/register';
import Account from 'pages/account';
import Tests from 'pages/tests';
import TestDetail from 'pages/tests/detail';
import TestQuestions from 'pages/tests/questions';
import ResultExam from 'pages/tests/results';
import Results from 'pages/results';
import ResultPart from 'pages/tests/result-part';
import FlashCards from 'pages/flashcards';
import AddFlashCards from 'pages/flashcards/add';
import FlashCardDetail from 'pages/flashcards/detail';

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
    path: '/account',
    component: Account
  },
  {
    path: '/tests',
    component: Tests
  },
  {
    path: '/tests/:id',
    component: TestDetail
  },
  {
    path: '/tests/:id/:type',
    component: TestQuestions
  },
  {
    path: '/tests/:id/results/:idResult',
    component: ResultExam
  },
  {
    path: '/results',
    component: Results
  },
  {
    path: '/tests/:testId/part/:partId',
    component: ResultPart
  },
  {
    path: '/flashcards',
    component: FlashCards
  },
  {
    path: '/flashcards/:id',
    component: FlashCardDetail
  },
  {
    path: '/flashcards/create',
    component: AddFlashCards
  }
];

export default routes;
