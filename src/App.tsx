import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import NoLayout from './layouts/NoLayout';

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ component: Component, path, layout, ...rest }) => {
          const Layout =
            layout === 'no-layout'
              ? NoLayout
              : layout === 'auth'
                ? AuthLayout
                : layout === 'admin'
                  ? AdminLayout
                  : MainLayout;
          return (
            <Route
              key={path}
              path={path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
              {...rest}
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
