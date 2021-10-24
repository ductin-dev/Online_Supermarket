// assets
import { IconBrandChrome, IconHelp, IconSitemap, IconExternalLink, IconInfoCircle } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome,
    IconHelp,
    IconSitemap,
    IconExternalLink,
    IconInfoCircle
};

// ===========================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||=========================== //

const other = {
    id: 'sample-docs-roadmap',
    title: 'Khác',
    type: 'group',
    children: [
        {
            id: 'about',
            title: 'Giới thiệu',
            type: 'item',
            url: '/about',
            icon: icons.IconInfoCircle,
            breadcrumbs: false
        },
        {
            id: 'documentation',
            title: 'External Blogs',
            type: 'item',
            url: 'https://www.satdevelop.com',
            icon: icons.IconExternalLink,
            external: true,
            target: true
        }
    ]
};

export default other;
