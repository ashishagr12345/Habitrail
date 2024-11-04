import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import Progress from './Progress';
import Settings from './Settings';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/progress', element: <Progress /> },
  { path: '/settings', element: <Settings /> },
])


const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
