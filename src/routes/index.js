import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

const Home = Loadable(lazy(() => import('../views/dashboard/Home')));
const About = Loadable(lazy(() => import('../views/sample-page/About')));
const Shop = Loadable(lazy(() => import('../views/sample-page/Shop')));
const Profile = Loadable(lazy(() => import('../views/sample-page/Profile')));
const Carts = Loadable(lazy(() => import('../views/sample-page/Carts')));
const Cart = Loadable(lazy(() => import('../views/sample-page/Cart')));
const Order = Loadable(lazy(() => import('../views/sample-page/Order')));

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/about',
            element: <About />
        },
        {
            path: '/shop/:shopId',
            element: <Shop />
        },
        {
            path: '/carts',
            element: <Carts />
        },
        {
            path: '/carts/:cartId',
            element: <Cart />
        },
        {
            path: '/order/:orderId',
            element: <Order />
        },
        {
            path: '/myprofile',
            element: <Profile />
        }
    ]
};

export default function ThemeRoutes() {
    return useRoutes([MainRoutes]);
}
