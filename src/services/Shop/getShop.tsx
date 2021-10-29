import { GET_SHOP, LOGIN_SHOP } from '../../endpoint';
import axios from 'axios';
import { message } from 'antd';

export const getShopHandler = (idShop: string, callback: (res: any) => void) => {
    axios
        .get(GET_SHOP + idShop)
        .then((res: any) => {
            callback(res.data);
        })
        .catch((err) => {
            message.warning('Đã lỗi');
        });
};

export const loginShopHandler = (phone: string, callback: (res: any) => void) => {
    axios
        .post(
            LOGIN_SHOP,
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
        });
};
