import Home from 'pages/home';
import SignIn from 'pages/login';
import SignUp from 'pages/register';
import Account from 'pages/account';
import Tests from 'pages/tests';
import TestDetail from 'pages/tests/detail';

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
