import { CREATE_CART } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';
import { loginShopHandler } from '../Shop/getShop';

export const addCartHandler = (cusId: string, shpPhone: string, callback: (res: any) => void) => {
    loginShopHandler(shpPhone, (res) => {
        axios
            .post(CREATE_CART, {
                customerId: cusId,
                shopId: res.shopId
            })
            .then((res: any) => {
                if (!res.data.isSuccess) {
                    message.warning(res.data.errorMessage);
                } else {
                    message.success('Đã thêm giỏ hàng mới');
                    callback(res.data);
                }
            })
            .catch((err) => {
                message.warning('Đã lỗi');
            });
    });
};
