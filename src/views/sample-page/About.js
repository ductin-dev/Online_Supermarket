import React from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';

//= =============================|| SAMPLE PAGE ||==============================//

const SamplePage = () => (
    <MainCard title="Về dự án">
        <Typography variant="body2">
            Đây là dự án cuối khoá của chương trình đào tạo Udemy, bạn có thể tham khảo thêm những dự án và nghiên cứu khác, cũng như ủng hộ
            các bài blog của tôi tại{' '}
            <a href="https://www.satdevelop.com" target="_blank">
                www.satdevelop.com
            </a>
            <br></br>
            <br></br>
            <i>_ have a nice day!</i>
        </Typography>
    </MainCard>
);

export default SamplePage;
