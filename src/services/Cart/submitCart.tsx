import { SUBMIT_CART, UNSUBMIT_CART } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const submitCartHandler = (itms: any, cusId: string, carId: string, callback: (res: any) => void) => {
    axios
        .post(SUBMIT_CART, {
            items: itms,
            customerId: cusId,
            cartId: carId
        })
        .then((res: any) => {
            message.success('Đã submit đơn hàng');
            callback(res.data);
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
export const unSubmitCartHandler = (cusId: string, carId: string, callback: (res: any) => void) => {
    axios
        .post(UNSUBMIT_CART, {
            customerId: cusId,
            cartId: carId
        })
        .then((res: any) => {
            message.warn('Đã huỷ xác nhận đơn hàng');
            callback(res.data);
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
