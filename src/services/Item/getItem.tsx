import { GET_ITEM } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const getItemHandler = (idItem: string, callback: (res: any) => void) => {
    axios
        .get(GET_ITEM + idItem)
        .then((res: any) => {
            callback(res.data);
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
