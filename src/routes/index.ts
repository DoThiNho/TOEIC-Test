import { lazy } from 'react';

const Home = lazy(() => import('pages/home'));
const SignIn = lazy(() => import('pages/login'));
const SignUp = lazy(() => import('pages/register'));
const Account = lazy(() => import('pages/account'));
const Tests = lazy(() => import('pages/tests'));
const TestDetail = lazy(() => import('pages/tests/detail'));

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
  }
];

export default routes;
