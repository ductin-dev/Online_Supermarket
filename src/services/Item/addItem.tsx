import { CREATE_ITEM } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const addItemHandler = (shopId: string, name: string, price: string, image: any, callbackSync: () => void) => {
    let formData = new FormData();

    formData.append('ShopId', shopId);
    formData.append('Name', name);
    formData.append('Price', price);
    formData.append('Image', image);

    axios
        .post(CREATE_ITEM, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            },
            data: formData
        })
        .then((res: any) => {
            callbackSync();
            message.success('Đã thêm');
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
