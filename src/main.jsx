import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserAuthContextProvider } from './components/UserAuthContext.jsx';
import Home from './pages/home.jsx';
import { StrictMode } from 'react';
import Login from './pages/login.jsx';
import NotFound from './pages/NotFound.jsx';

const router = createBrowserRouter([
  {
    path: '/siteTest/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/siteTest/login',
    element: <Login />,
    errorElement: <NotFound />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthContextProvider>
      <RouterProvider router={router} />
    </UserAuthContextProvider>
  </StrictMode>,
)
