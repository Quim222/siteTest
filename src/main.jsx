import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { UserAuthContextProvider } from './components/UserAuthContext.jsx';
import Home from './pages/home.jsx';
import { StrictMode } from 'react';

const router = createBrowserRouter([
  {
    path: '/siteTest/',
    element: <Home />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthContextProvider>
      <RouterProvider router={router} />
    </UserAuthContextProvider>
  </StrictMode>,
)
