import { lazy } from 'react';

const Home = lazy(() => import('pages/home'));
const SignIn = lazy(() => import('pages/login'));
const SignUp = lazy(() => import('pages/register'));

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
  }
];

export default routes;
