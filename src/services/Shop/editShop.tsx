import { UPDATE_SHOP } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const editShopHandler = (name: string, phone: string, newPhone: string, logo: any) => {
    let formData = new FormData();

    formData.append('Name', name);

    formData.append('PhoneNumber', phone);

    formData.append('NewPhoneNumber', newPhone);

    formData.append('Logo', logo);

    axios
        .put(UPDATE_SHOP, formData, {
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
