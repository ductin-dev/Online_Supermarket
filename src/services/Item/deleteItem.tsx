import { DELETE_ITEM } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const deleteItemHandler = (shopId: string, itemId: string) => {
    axios
        .delete(DELETE_ITEM, {
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                shopId: shopId,
                itemId: itemId
            }
        })
        .then((res: any) => {
            message.success('Đã xoá');
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
