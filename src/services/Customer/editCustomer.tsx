import { UPDATE_CUSTOMER } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const editCusHandler = (cusId: string, name: string, phone: string, avatar: any) => {
    let formData = new FormData();
    formData.append('CustomerId', cusId);
    formData.append('Name', name);
    formData.append('PhoneNumber', phone);
    formData.append('Avatar', avatar);

    axios
        .put(UPDATE_CUSTOMER, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            },
            data: formData
        })
        .then((res: any) => {
            if (res.data.isSuccess) {
                localStorage.setItem('jwtFake', phone);
                message.success('Đã cập nhật');
            }
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};
