import { CREATE_SHOP } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const addShopHandler = (name: string, phone: string, logo: any) => {
    let formData = new FormData();

    formData.append('Name', name);

    formData.append('PhoneNumber', phone);

    formData.append('Logo', logo);

    axios
        .post(CREATE_SHOP, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            },
            data: formData
        })
        .then((res: any) => {
            message.success('Đã thêm');
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
