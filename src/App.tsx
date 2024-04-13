import '@mantine/core/styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ component: Component, path, ...rest }) => (
          <Route key={path} path={path} element={<Component />} {...rest} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
