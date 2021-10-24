import React from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import ItemList from '../../ui-component/table/ItemList';

//= =============================|| SAMPLE PAGE ||==============================//

const SamplePage = () => (
    <MainCard title="Danh sách mặt hàng">
        <ItemList />
    </MainCard>
);

export default SamplePage;
