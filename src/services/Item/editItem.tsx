import { UPDATE_ITEM } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const editItemHandler = (shopId: string, itemId: string, name: string, price: string, image: any) => {
    let formData = new FormData();

    formData.append('ShopId', shopId);
    formData.append('ItemId', itemId);
    formData.append('Name', name);
    formData.append('Price', price);
    formData.append('Image', image);

    axios
        .put(UPDATE_ITEM, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            },
            data: formData
        })
        .then((res: any) => {
            message.success('Đã cập nhật');
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
