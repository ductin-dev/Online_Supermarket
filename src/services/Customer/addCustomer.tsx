import { ADD_CUSTOMER } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const addCusHandler = (name: string, phone: string, avatar: any) => {
    let formData = new FormData();

    formData.append('Name', name);
    formData.append('PhoneNumber', phone);
    formData.append('Avatar', avatar);

    axios
        .post(ADD_CUSTOMER, formData, {
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
