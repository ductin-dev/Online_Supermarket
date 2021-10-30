import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const addItemToCart = (itmId: string, cusId: string, crtId: string, callback: () => void) => {
    axios
        .post(ADD_ITEM_TO_CART, {
            itemId: itmId,
            customerId: cusId,
            cartId: crtId
        })
        .then((res: any) => {
            if (!res.data.isSuccess) {
                message.warning(res.data.errorMessage);
            } else {
                message.success('Đã thêm sản phẩm vào giỏ hàng');
                callback();
            }
        })
        .catch((err) => {
            console.log(err);
            message.warning('Đã lỗi');
        });
};

export const removeItemFromCart = (itmId: string, cusId: string, crtId: string, callback: () => void) => {
    axios
        .post(REMOVE_ITEM_FROM_CART, {
            itemId: itmId,
            customerId: cusId,
            cartId: crtId
        })
        .then((res: any) => {
            if (!res.data.isSuccess) {
                message.warning(res.data.errorMessage);
            } else {
                message.warning('Đã xoá sản phẩm khỏi giỏ hàng');
                callback();
            }
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
