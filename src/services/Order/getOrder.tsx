import { GET_ALL_ORDER_BY_CUSTOMER, GET_ALL_ORDER_BY_SHOP, GET_ORDER } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const getOrderHandler = (ordId: string, callback: (res: any) => void) => {
    axios
        .get(GET_ORDER + ordId)
        .then((res: any) => {
            callback(res.data);
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};

export const getAllOrderByCustomerHandler = (cusId: string, callback: (res: any) => void) => {
    axios
        .get(GET_ALL_ORDER_BY_CUSTOMER.replace('{}', cusId))
        .then((res: any) => {
            callback(res.data);
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};

export const getAllOrderByShopHandler = (shopId: string, callback: (res: any) => void) => {
    axios
        .get(GET_ALL_ORDER_BY_SHOP.replace('{}', shopId))
        .then((res: any) => {
            callback(res.data);
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
