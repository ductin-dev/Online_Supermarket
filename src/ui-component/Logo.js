import React from 'react';

import { Image } from 'antd';
import { useTheme } from '@material-ui/styles';

import img from '../assets/images/Satellite.png';

const Logo = () => {
    const theme = useTheme();

    return <Image width={100} src={img} />;
};

export default Logo;
