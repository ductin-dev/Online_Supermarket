import { CREATE_CART } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const addCartHandler = (cusId: string, shpId: string, callback: (res: any) => void) => {
    axios
        .post(CREATE_CART, {
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                customerId: cusId,
                shopId: shpId
            }
        })
        .then((res: any) => {
            message.success('Đã thêm giỏ hàng mới');
            callback(res.data);
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
