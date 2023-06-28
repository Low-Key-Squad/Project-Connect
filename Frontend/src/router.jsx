import {Navigate, createBrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import Logscreen from './pages/Logscreen';
import Singup from './pages/Singup';
import Menu from './pages/Menu';
import Profile from './pages/Profile';
import Swipe from './pages/Swipe';
import Chat from './pages/Chat';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';

const router =createBrowserRouter([
    {path: '/',
    element: <DefaultLayout/>,
    children:[
        {
            path: '/',
            element: <Navigate to='/menu'/>,
        },
        {
            path: '/menu',
            element: <Menu />
        },
        {
            path: '/chat',
            element: <Chat />
        },
        {
            path: '/swipe',
            element: <Swipe />
        },
        {
            path: '/profile',
            element: <Profile />
        },
    ]},
    {
        path: '/',
        element: <GuestLayout />,
        children:[
            {
                path: '/home',
                element: <Home />,
              },
              {
                  path: '/login',
                  element: <Logscreen />,
              },
              {
                  path: '/signup',
                  element: <Singup />,
              }

        ]
      }
])
    

export default router;