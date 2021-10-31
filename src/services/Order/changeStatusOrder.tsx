import { CANCEL_ORDER, UPDATE_STATUS_ORDER } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const cancelOrderHandler = (ordId: string, cusId: string, callback: (res: any) => void) => {
    axios
        .put(
            CANCEL_ORDER,
            {
                orderId: ordId,
                customerId: cusId
            },
            { headers: { 'Access-Control-Allow-Origin': '*' } }
        )
        .then((res: any) => {
            callback(res.data);
            message.success('Đã huỷ đơn hàng');
        })
        .catch((err) => {
            console.log(err);
            callback(err);
            message.warning('Đã lỗi');
        });
};

export const updateStatusOrderHandler = (
    ordId: string,
    status: 'Confirmed' | 'Sent To Kitchen' | 'Ready for Pickup' | 'Delivered',
    cusId: string,
    shpId: string,
    callback: (res: any) => void
) => {
    axios
        .put(UPDATE_STATUS_ORDER, {
            orderId: ordId,
            orderStatus: status,
            customerId: cusId,
            shopId: shpId
        })
        .then((res: any) => {
            callback(res.data);
            message.success('Đã cập nhật đơn hàng');
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
