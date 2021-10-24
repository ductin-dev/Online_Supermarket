import React from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';

//= =============================|| SAMPLE PAGE ||==============================//

const SamplePage = () => (
    <MainCard title="Mô tả web">
        <Typography variant="body2">Đây là dự án mock</Typography>
    </MainCard>
);

export default SamplePage;
