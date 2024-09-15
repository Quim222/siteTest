import { createRoot } from 'react-dom/client';
import './index.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { UserAuthContextProvider } from './components/UserAuthContext.jsx';
import Home from './pages/home.jsx';
import { StrictMode } from 'react';
import Login from './pages/login.jsx';
import NotFound from './pages/NotFound.jsx';
import Publication from './pages/publication.jsx';
import HomeUser from './pages/HomeUser.jsx';
import ProtectedRouter from './components/protectedRouter.jsx';
import Profile from './pages/profile.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Feedback from './pages/feedback.jsx';

const router = createHashRouter([
  {
    path: '/siteTest/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/siteTest/login',
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: '/siteTest/home',
    element: (
      <ProtectedRouter>
        <HomeUser />
      </ProtectedRouter>
    ),
    children: [
      {
        path: '/siteTest/home/:pubID', // Rota relativa a /home
        element: (
          <ProtectedRouter>
            <Publication />
          </ProtectedRouter>
        ),
      },
    ],
  },
  {
    path: '/siteTest/profile',
    element: (
      <ProtectedRouter>
        <Profile />
      </ProtectedRouter>
    ),
  },
  {
    path: '/siteTest/about',
    element: <About />,
  },
  {
    path: '/siteTest/contact',
    element: <Contact />,
  },
  {
    path: '/siteTest/feedback',
    element: <Feedback />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthContextProvider>
      <RouterProvider router={router} />
    </UserAuthContextProvider>
  </StrictMode>
);
