import { ACTIVE_ITEM } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const activeItemHandler = (shopId: string, itemId: string) => {
    axios
        .put(ACTIVE_ITEM, {
            shopId: shopId,
            itemid: itemId
        })
        .then((res: any) => {
            message.success('Đã kích hoạt');
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
