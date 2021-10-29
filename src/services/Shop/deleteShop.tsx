import { DELETE_SHOP } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const deleteShopHandler = (phone: string) => {
    axios
        .delete(DELETE_SHOP, {
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                phoneNumber: phone
            }
        })
        .then((res: any) => {
            message.success('Đã xoá');
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
