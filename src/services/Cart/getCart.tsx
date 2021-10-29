import { GET_CART } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const getCartHandler = (cartId: string, callback: (res: any) => void) => {
    axios
        .get(GET_CART + cartId)
        .then((res: any) => {
            callback(res.data);
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
