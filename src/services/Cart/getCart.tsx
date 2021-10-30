import { GET_CART, GET_CART_BY_CUSTOMER } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';
import { loginShopHandler } from '../Shop/getShop';

export const getCartHandler = (cartId: string, callback: (res: any) => void) => {
    axios
        .get(GET_CART + cartId + '?getShop=true')
        .then((res: any) => {
            callback(res.data);
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};

export const getCartByCustomerHandler = (cusId: string, shpPhone: string, callback: (res: any) => void) => {
    loginShopHandler(shpPhone, (res) => {
        axios
            .post(GET_CART_BY_CUSTOMER, {
                customerId: cusId,
                shopId: res.shopId
            })
            .then((res: any) => {
                callback(res.data);
            })
            .catch((err) => {
                message.warning('Không tìm thấy shop này');
            });
    });
};
