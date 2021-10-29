import { CREATE_ORDER } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const addOrderHandler = (cusId: string, delInfor: string) => {
    axios
        .post(CREATE_ORDER, {
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                cartId: cusId,
                deliveryInformation: delInfor
            }
        })
        .then((res: any) => {
            message.success('Đã thêm');
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
