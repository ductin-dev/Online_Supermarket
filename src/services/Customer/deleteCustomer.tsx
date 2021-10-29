import { DELETE_CUSTOMER } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const deleteCusHandler = (cusId: string) => {
    axios
        .delete(DELETE_CUSTOMER, {
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                customerId: cusId
            }
        })
        .then((res: any) => {
            message.success('Đã xoá');
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
