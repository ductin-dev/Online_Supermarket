// assets
import { IconDashboard, IconDeviceAnalytics, IconUserCheck, IconInfoCircle, IconShoppingCart } from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconUserCheck,
    IconInfoCircle,
    IconShoppingCart
};

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const dashboard = {
    id: 'dashboard',
    title: 'Điều hướng',
    caption: 'Chọn tính năng',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Trang chủ',
            type: 'item',
            url: '/',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'cart',
            title: 'Giỏ hàng',
            type: 'item',
            url: '/cart',
            icon: icons.IconShoppingCart,
            breadcrumbs: false
        },
        {
            id: 'profile',
            title: 'My Profile',
            type: 'item',
            url: '/profile',
            icon: icons.IconUserCheck,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
