import { CANCEL_ORDER, UPDATE_STATUS_ORDER } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const cancelOrderHandler = (ordId: string, cusId: string, callback: (res: any) => void) => {
    axios
        .put(CANCEL_ORDER, {
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                orderId: ordId,
                customerId: cusId
            }
        })
        .then((res: any) => {
            callback(res.data);
            message.success('Đã huỷ đơn hàng');
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};

export const updateStatusOrderHandler = (ordId: string, status: string, cusId: string, shpId: string, callback: (res: any) => void) => {
    axios
        .put(UPDATE_STATUS_ORDER, {
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                orderId: ordId,
                orderStatus: status,
                customerId: cusId,
                shopId: shpId
            }
        })
        .then((res: any) => {
            callback(res.data);
            message.success('Đã cập nhật đơn hàng');
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
