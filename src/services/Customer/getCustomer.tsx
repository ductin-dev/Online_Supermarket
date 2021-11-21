import { LOGIN_CUSTOMER } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const loginCusHandler = (phone: string, callback: (res: any) => void) => {
    axios
        .post(
            LOGIN_CUSTOMER,
            JSON.stringify({
                phoneNumber: phone
            }),
            {
                headers: {
                    'Content-type': 'application/json'
                }
            }
        )
        .then((res: any) => {
            callback(res.data);
        })
        .catch((err) => {
            message.warning('Đã lỗi');
            callback(0);
        });
};

export const logoutCusHandler = () => {
    localStorage.removeItem('jwtFake');
};
