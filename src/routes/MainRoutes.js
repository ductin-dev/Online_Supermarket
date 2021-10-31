import React, { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
const Home = Loadable(lazy(() => import('../views/dashboard/Home')));
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons')));

// sample page routing
const About = Loadable(lazy(() => import('../views/sample-page/About')));
const Shop = Loadable(lazy(() => import('../views/sample-page/Shop')));
const Profile = Loadable(lazy(() => import('../views/sample-page/Profile')));
const Carts = Loadable(lazy(() => import('../views/sample-page/Carts')));
const Cart = Loadable(lazy(() => import('../views/sample-page/Cart')));
const Order = Loadable(lazy(() => import('../views/sample-page/Order')));
// ===========================|| MAIN ROUTING ||=========================== //

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
        },
        //====================
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/utils/util-typography',
            element: <UtilsTypography />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        }
    ]
};

export default MainRoutes;
