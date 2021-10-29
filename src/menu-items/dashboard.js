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
            id: 'carts',
            title: 'Giỏ hàng',
            type: 'item',
            url: '/carts',
            icon: icons.IconShoppingCart,
            breadcrumbs: false
        },
        {
            id: 'myprofile',
            title: 'My Profile',
            type: 'item',
            url: '/myprofile',
            icon: icons.IconUserCheck,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
